// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Dqq8XRa69jkevbZNib8DLc7GQHf4y_I",
  authDomain: "can-app-image.firebaseapp.com",
  projectId: "can-app-image",
  storageBucket: "can-app-image.appspot.com",
  messagingSenderId: "597912193353",
  appId: "1:597912193353:web:86a0a32c9cfbace836f298",
  measurementId: "G-TRVMMMCL3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);