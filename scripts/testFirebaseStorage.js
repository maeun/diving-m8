const { initializeApp } = require('firebase/app');
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require('firebase/storage');

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

async function testStorage() {
  try {
    console.log('🧪 Testing Firebase Storage connection...');
    console.log('📍 Storage bucket:', firebaseConfig.storageBucket);

    // Create a simple test file
    const testData = new TextEncoder().encode('Hello Firebase Storage!');
    const testRef = ref(storage, 'test/connection-test.txt');

    console.log('📤 Uploading test file...');
    const snapshot = await uploadBytes(testRef, testData);

    console.log('📥 Getting download URL...');
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('✅ Firebase Storage test successful!');
    console.log('🔗 Test file URL:', downloadURL);

    return true;
  } catch (error) {
    console.error('❌ Firebase Storage test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    if (error.code === 'storage/unauthorized') {
      console.log('💡 This might be a permissions issue. Check Storage rules.');
    } else if (error.code === 'storage/unknown') {
      console.log(
        '💡 Storage might not be fully activated yet. Wait a few minutes and try again.'
      );
    }

    return false;
  }
}

testStorage();
