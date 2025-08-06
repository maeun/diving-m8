const { initializeApp } = require('firebase/app');
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require('firebase/storage');
const { getFirestore, doc, updateDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase 설정
const firebaseConfig = {
  apiKey: 'AIzaSyCftPP2-OORWjbGJ-HVseVINk-zqOxc7wY',
  authDomain: 'diving-m8.firebaseapp.com',
  projectId: 'diving-m8',
  storageBucket: 'diving-m8.firebasestorage.app',
  messagingSenderId: '179779366495',
  appId: '1:179779366495:web:15085a6d0b346669c7f5ea',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// 마이그레이션할 이미지 정보
const imagesToMigrate = [
  {
    instructorId: 'pofthesea',
    localFiles: {
      profile: 'public/yeojun_profile.jpg',
      gallery: [
        'public/yeojun_1.jpg',
        'public/yeojun_2.jpg',
        'public/yeojun_3.jpg',
      ],
    },
  },
];

// 외부 URL에서 이미지 다운로드
async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  } catch (error) {
    console.error(`❌ Failed to download ${url}:`, error);
    return null;
  }
}

// 로컬 파일 읽기
function readLocalFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    } else {
      console.warn(`⚠️ Local file not found: ${filePath}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error reading local file ${filePath}:`, error);
    return null;
  }
}

// Firebase Storage에 이미지 업로드
async function uploadImageToStorage(buffer, storagePath, filename) {
  try {
    const imageRef = ref(storage, `${storagePath}/${filename}`);
    const snapshot = await uploadBytes(imageRef, buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log(`✅ Uploaded: ${storagePath}/${filename}`);
    return downloadURL;
  } catch (error) {
    console.error(`❌ Upload failed for ${storagePath}/${filename}:`, error);
    return null;
  }
}

// 외부 URL 이미지들을 Firebase Storage로 마이그레이션
const externalImages = [
  {
    instructorId: 'sarah-johnson',
    profileUrl:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
  },
  {
    instructorId: 'mike-rodriguez',
    profileUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
];

async function migrateImages() {
  console.log('🚀 Starting image migration to Firebase Storage...');

  try {
    // 1. 로컬 파일 마이그레이션 (윤여준 강사)
    for (const instructor of imagesToMigrate) {
      console.log(`\n📝 Processing instructor: ${instructor.instructorId}`);

      const updatedData = {};

      // 프로필 이미지 마이그레이션
      if (instructor.localFiles.profile) {
        console.log('📤 Uploading profile image...');
        const profileBuffer = readLocalFile(instructor.localFiles.profile);

        if (profileBuffer) {
          const profileUrl = await uploadImageToStorage(
            profileBuffer,
            `instructors/${instructor.instructorId}/profile`,
            'profile.jpg'
          );

          if (profileUrl) {
            updatedData.profileImage = profileUrl;
          }
        }
      }

      // 갤러리 이미지 마이그레이션
      if (
        instructor.localFiles.gallery &&
        instructor.localFiles.gallery.length > 0
      ) {
        console.log('📤 Uploading gallery images...');
        const galleryUrls = [];

        for (let i = 0; i < instructor.localFiles.gallery.length; i++) {
          const galleryPath = instructor.localFiles.gallery[i];
          const galleryBuffer = readLocalFile(galleryPath);

          if (galleryBuffer) {
            const galleryUrl = await uploadImageToStorage(
              galleryBuffer,
              `instructors/${instructor.instructorId}/gallery`,
              `gallery_${i + 1}.jpg`
            );

            if (galleryUrl) {
              galleryUrls.push({
                url: galleryUrl,
                type: 'image',
                order: i,
              });
            }
          }
        }

        if (galleryUrls.length > 0) {
          updatedData.gallery = galleryUrls;
        }
      }

      // Firestore 업데이트
      if (Object.keys(updatedData).length > 0) {
        console.log('💾 Updating Firestore document...');
        await updateDoc(doc(db, 'instructors', instructor.instructorId), {
          ...updatedData,
          updatedAt: new Date(),
        });
        console.log(`✅ Updated ${instructor.instructorId} in Firestore`);
      }
    }

    // 2. 외부 URL 이미지 마이그레이션
    for (const instructor of externalImages) {
      console.log(
        `\n📝 Processing external images for: ${instructor.instructorId}`
      );

      if (instructor.profileUrl) {
        console.log('📤 Downloading and uploading profile image...');
        const imageBuffer = await downloadImage(
          instructor.profileUrl,
          'profile.jpg'
        );

        if (imageBuffer) {
          const profileUrl = await uploadImageToStorage(
            imageBuffer,
            `instructors/${instructor.instructorId}/profile`,
            'profile.jpg'
          );

          if (profileUrl) {
            // Firestore 업데이트
            await updateDoc(doc(db, 'instructors', instructor.instructorId), {
              profileImage: profileUrl,
              updatedAt: new Date(),
            });
            console.log(
              `✅ Updated ${instructor.instructorId} profile image in Firestore`
            );
          }
        }
      }
    }

    console.log('\n🎉 Image migration completed successfully!');
    console.log('\n📊 Migration Summary:');
    console.log(
      `   - Local files migrated: ${imagesToMigrate.length} instructors`
    );
    console.log(
      `   - External URLs migrated: ${externalImages.length} instructors`
    );
    console.log('\n🔗 Updated URLs can be found in Firebase Console:');
    console.log(
      '   - Storage: https://console.firebase.google.com/project/diving-m8/storage'
    );
    console.log(
      '   - Firestore: https://console.firebase.google.com/project/diving-m8/firestore'
    );
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// 마이그레이션 실행
migrateImages();
