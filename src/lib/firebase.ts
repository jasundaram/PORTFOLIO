import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import devConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp({
  apiKey: devConfig.apiKey,
  authDomain: devConfig.authDomain,
  projectId: devConfig.projectId,
  storageBucket: devConfig.storageBucket,
  messagingSenderId: devConfig.messagingSenderId,
  appId: devConfig.appId
});

// Configure services supporting sub-database structures
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication helpers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function loginWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Auth popcheck failed:', error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Auth teardown error:', error);
    throw error;
  }
}

export { auth, db };
