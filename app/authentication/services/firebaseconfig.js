import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-MWK6Y22BDX" // Keep this if needed
};

const app = initializeApp(firebaseConfig); // init firebase app
export const auth = getAuth(app); // init firebase auth
export const db = getFirestore(app); // firestore
export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBa11-q7IzJwVKYhoSZOeHKoKSWWvmADxM",
//   authDomain: "ikigai-2bbd4.firebaseapp.com",
//   projectId: "ikigai-2bbd4",
//   storageBucket: "ikigai-2bbd4.firebasestorage.app",
//   messagingSenderId: "326117409484",
//   appId: "1:326117409484:web:da98a107619ac6380ef869",
//   measurementId: "G-MWK6Y22BDX"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);