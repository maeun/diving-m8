import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'demo-project.appspot.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:demo',
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators only if using demo config or explicitly enabled
const useEmulator =
  process.env.NODE_ENV === 'development' &&
  (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-api-key' ||
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true');

if (useEmulator) {
  console.log('🧪 Using Firebase Emulators');

  // Connect to Firestore Emulator
  try {
    connectFirestoreEmulator(db, 'localhost', 8082);
    console.log('🔗 Connected to Firestore Emulator on localhost:8082');
  } catch (error) {
    console.warn('⚠️ Firestore emulator connection failed:', error);
  }

  // Connect to Auth Emulator (only in browser)
  if (typeof window !== 'undefined') {
    try {
      connectAuthEmulator(auth, 'http://localhost:9097', {
        disableWarnings: true,
      });
      console.log('🔗 Connected to Auth Emulator on localhost:9097');
    } catch (error) {
      console.warn('⚠️ Auth emulator connection failed:', error);
    }

    // Connect to Storage Emulator
    try {
      connectStorageEmulator(storage, 'localhost', 9197);
      console.log('🔗 Connected to Storage Emulator on localhost:9197');
    } catch (error) {
      console.warn('⚠️ Storage emulator connection failed:', error);
    }
  }
} else {
  console.log('🔥 Using Real Firebase Project:', firebaseConfig.projectId);
}

export default app;
