// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvqs2Yuv3xutASJKToxK-cvyXszjnjgcw",
  authDomain: "internetsoft-48c0c.firebaseapp.com",
  projectId: "internetsoft-48c0c",
  storageBucket: "internetsoft-48c0c.firebasestorage.app",
  messagingSenderId: "338897591402",
  appId: "1:338897591402:web:832686df07757cad85be13",
  measurementId: "G-FHR1K6YVBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
