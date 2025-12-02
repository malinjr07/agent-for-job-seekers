// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJtuQZYmI9tmwPV9Evyx6lJSDQ8AFJ5sE",
  authDomain: "agent-for-job-seekers.firebaseapp.com",
  projectId: "agent-for-job-seekers",
  storageBucket: "agent-for-job-seekers.firebasestorage.app",
  messagingSenderId: "908810381770",
  appId: "1:908810381770:web:8609ed70d4bb724c61c733",
  measurementId: "G-LKS9TW7T0Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);