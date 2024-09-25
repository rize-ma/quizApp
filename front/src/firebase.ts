// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuLsCrqXif2xABEFtzVqMEq896yy8A0MA",
  authDomain:
    "[quiz-app-f7b98.firebaseapp.com](http://quiz-app-f7b98.firebaseapp.com/)",
  projectId: "quiz-app-f7b98",
  storageBucket:
    "[quiz-app-f7b98.appspot.com](http://quiz-app-f7b98.appspot.com/)",
  messagingSenderId: "101785647677",
  appId: "1:101785647677:web:9c9684ae4cf81c1ac7c854",
  measurementId: "G-90LQ1P0MTT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { analytics, storage };
