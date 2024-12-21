// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const toSnakeUpperCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();

const firebaseConfig = Object.fromEntries(
  [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
    'measurementId',
  ].map((key) => [
    key,
    import.meta.env[`VITE_FIREBASE_${toSnakeUpperCase(key)}`],
  ]),
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

const auth = getAuth();
const signIn = async () => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    import.meta.env.VITE_FIREBASE_AUTH_EMAIL,
    import.meta.env.VITE_FIREBASE_AUTH_PASSWORD,
  );
  const user = userCredential.user;
  return user;
};

export { analytics, storage, signIn };
