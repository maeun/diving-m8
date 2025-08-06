import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { storage } from '@/lib/firebase';

/**
 * Upload image to Firebase Storage with optimized naming
 */
export async function uploadImage(
  file: File,
  path: string,
  instructorId: string,
  customName?: string
): Promise<string> {
  try {
    // Generate optimized filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = customName || `${path}_${timestamp}.${fileExtension}`;

    // Create a reference to the file location
    const imageRef = ref(
      storage,
      `instructors/${instructorId}/${path}/${fileName}`
    );

    console.log(
      '📤 Uploading image:',
      fileName,
      'to path:',
      `instructors/${instructorId}/${path}/`
    );

    // Upload the file
    const snapshot = await uploadBytes(imageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('✅ Image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('❌ Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Upload multiple images to Firebase Storage
 */
export async function uploadMultipleImages(
  files: File[],
  path: string,
  instructorId: string
): Promise<string[]> {
  try {
    console.log(`📤 Uploading ${files.length} images to ${path}`);

    const uploadPromises = files.map((file, index) =>
      uploadImage(file, path, instructorId, `${path}_${index + 1}`)
    );

    const urls = await Promise.all(uploadPromises);
    console.log(`✅ Successfully uploaded ${urls.length} images`);

    return urls;
  } catch (error) {
    console.error('❌ Error uploading multiple images:', error);
    throw new Error('Failed to upload images');
  }
}

/**
 * Upload profile image
 */
export async function uploadProfileImage(
  file: File,
  instructorId: string
): Promise<string> {
  return uploadImage(file, 'profile', instructorId, 'profile');
}

/**
 * Upload gallery image
 */
export async function uploadGalleryImage(
  file: File,
  instructorId: string
): Promise<string> {
  return uploadImage(file, 'gallery', instructorId);
}

/**
 * Get all images from a specific path
 */
export async function getImagesFromPath(
  instructorId: string,
  path: string
): Promise<string[]> {
  try {
    const imagesRef = ref(storage, `instructors/${instructorId}/${path}`);
    const result = await listAll(imagesRef);

    const urlPromises = result.items.map((item) => getDownloadURL(item));
    const urls = await Promise.all(urlPromises);

    console.log(`📥 Retrieved ${urls.length} images from ${path}`);
    return urls;
  } catch (error) {
    console.error(`❌ Error getting images from ${path}:`, error);
    return [];
  }
}

/**
 * Get instructor profile image
 */
export async function getProfileImage(
  instructorId: string
): Promise<string | null> {
  try {
    const profileRef = ref(
      storage,
      `instructors/${instructorId}/profile/profile.jpg`
    );
    const url = await getDownloadURL(profileRef);
    return url;
  } catch (error) {
    console.warn(`⚠️ Profile image not found for ${instructorId}`);
    return null;
  }
}

/**
 * Get instructor gallery images
 */
export async function getGalleryImages(
  instructorId: string
): Promise<string[]> {
  return getImagesFromPath(instructorId, 'gallery');
}

/**
 * Delete image from Firebase Storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Create a reference from the URL
    const imageRef = ref(storage, imageUrl);

    console.log('🗑️ Deleting image:', imageUrl);

    // Delete the file
    await deleteObject(imageRef);

    console.log('✅ Image deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only JPEG, PNG, and WebP images are allowed',
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image size must be less than 5MB',
    };
  }

  return { isValid: true };
}

/**
 * Resize image before upload (client-side)
 */
export function resizeImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error('Failed to resize image'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Convert local file to File object for upload
 */
export async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}
