const { initializeApp } = require('firebase/app');
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require('firebase/storage');
const { getFirestore, doc, updateDoc } = require('firebase/firestore');

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

// 새로운 이미지 URL (작동하는 Unsplash 이미지)
const newImageUrl =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face';

async function updateSarahImage() {
  try {
    console.log('📝 Updating Sarah Johnson profile image...');

    // 이미지 다운로드
    console.log('📥 Downloading new image...');
    const response = await fetch(newImageUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const imageBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageBuffer);

    // Firebase Storage에 업로드
    console.log('📤 Uploading to Firebase Storage...');
    const imageRef = ref(
      storage,
      'instructors/sarah-johnson/profile/profile.jpg'
    );
    const snapshot = await uploadBytes(imageRef, imageData);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('✅ Image uploaded successfully:', downloadURL);

    // Firestore 업데이트
    console.log('💾 Updating Firestore document...');
    await updateDoc(doc(db, 'instructors', 'sarah-johnson'), {
      profileImage: downloadURL,
      updatedAt: new Date(),
    });

    console.log('✅ Sarah Johnson profile image updated successfully!');
    console.log('🔗 New image URL:', downloadURL);
  } catch (error) {
    console.error('❌ Error updating Sarah image:', error);
  }
}

updateSarahImage();
