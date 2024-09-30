// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaaO2pd1-kadGkWT0PVbNQOBO4AtVsKbc",
  authDomain: "ai-trip-planner-f355c.firebaseapp.com",
  projectId: "ai-trip-planner-f355c",
  storageBucket: "ai-trip-planner-f355c.appspot.com",
  messagingSenderId: "268894366919",
  appId: "1:268894366919:web:aef83c4b8854d776a6a2e2",
  measurementId: "G-LEQ6YFHEKC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
