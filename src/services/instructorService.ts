import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  enableNetwork,
  waitForPendingWrites,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { InstructorProfile } from '@/types';
import { getProfileImage, getGalleryImages } from './imageService';

/**
 * Get instructor profile by ID
 */
export async function getInstructorById(
  instructorId: string
): Promise<InstructorProfile | null> {
  try {
    // Ensure network is enabled
    await enableNetwork(db);

    console.log('🔍 Fetching instructor:', instructorId);

    const instructorRef = doc(db, 'instructors', instructorId);
    const instructorSnap = await getDoc(instructorRef);

    console.log('📄 Document exists:', instructorSnap.exists());

    if (instructorSnap.exists()) {
      const data = instructorSnap.data() as InstructorProfile;

      // Load images from Firebase Storage if not already Firebase URLs
      let profileImage = data.profileImage;
      let gallery = data.gallery || [];

      // Check if profile image needs to be loaded from Storage
      if (
        profileImage &&
        !profileImage.startsWith('https://firebasestorage.googleapis.com')
      ) {
        console.log('📸 Loading profile image from Firebase Storage...');
        try {
          const storageProfileImage = await getProfileImage(instructorId);
          if (storageProfileImage) {
            profileImage = storageProfileImage;
            console.log('✅ Profile image loaded from Storage');
          }
        } catch (storageError) {
          console.warn(
            '⚠️ Failed to load profile image from Storage:',
            storageError
          );
        }
      }

      // Check if gallery images need to be loaded from Storage
      const hasNonStorageGallery = gallery.some(
        (item) =>
          item.url &&
          !item.url.startsWith('https://firebasestorage.googleapis.com')
      );

      if (hasNonStorageGallery || gallery.length === 0) {
        console.log('📸 Loading gallery images from Firebase Storage...');
        try {
          const storageGalleryUrls = await getGalleryImages(instructorId);
          if (storageGalleryUrls.length > 0) {
            gallery = storageGalleryUrls.map((url, index) => ({
              url,
              type: 'image' as const,
              order: index,
              caption: '',
            }));
            console.log(
              `✅ Loaded ${gallery.length} gallery images from Storage`
            );
          }
        } catch (storageError) {
          console.warn(
            '⚠️ Failed to load gallery images from Storage:',
            storageError
          );
        }
      }

      // Increment view count (non-blocking)
      try {
        await updateDoc(instructorRef, {
          'stats.views': increment(1),
          updatedAt: new Date(),
        });
        console.log('📈 View count updated');
      } catch (updateError) {
        console.warn('⚠️ Failed to update view count:', updateError);
      }

      return {
        ...data,
        id: instructorSnap.id,
        profileImage,
        gallery,
      };
    } else {
      console.log('❌ Instructor not found:', instructorId);
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching instructor:', error);

    // Check if it's a network issue
    if (error instanceof Error && error.message.includes('offline')) {
      console.log('🔄 Retrying with network enable...');
      try {
        await enableNetwork(db);
        await waitForPendingWrites(db);
        // Retry once
        const instructorRef = doc(db, 'instructors', instructorId);
        const instructorSnap = await getDoc(instructorRef);

        if (instructorSnap.exists()) {
          return {
            ...(instructorSnap.data() as InstructorProfile),
            id: instructorSnap.id,
          };
        }
      } catch (retryError) {
        console.error('❌ Retry failed:', retryError);
      }
    }

    throw new Error('Failed to fetch instructor profile');
  }
}

/**
 * Get multiple instructors (for search/listing)
 */
export async function getInstructors(
  limit: number = 10
): Promise<InstructorProfile[]> {
  try {
    const instructorsRef = collection(db, 'instructors');
    const q = query(
      instructorsRef,
      where('isApproved', '==', true),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(q);
    const instructors: InstructorProfile[] = [];

    querySnapshot.forEach((doc) => {
      instructors.push({
        ...(doc.data() as InstructorProfile),
        id: doc.id,
      });
    });

    return instructors;
  } catch (error) {
    console.error('Error fetching instructors:', error);
    throw new Error('Failed to fetch instructors');
  }
}

/**
 * Check if instructor exists
 */
export async function instructorExists(instructorId: string): Promise<boolean> {
  try {
    const instructorRef = doc(db, 'instructors', instructorId);
    const instructorSnap = await getDoc(instructorRef);
    return instructorSnap.exists();
  } catch (error) {
    console.error('Error checking instructor existence:', error);
    return false;
  }
}
