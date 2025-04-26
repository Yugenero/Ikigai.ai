import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
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