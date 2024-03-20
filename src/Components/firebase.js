// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYh9G2K8NpE0ry0ZHxENkKLzGlatP5rUo",
  authDomain: "insta-user-data.firebaseapp.com",
  databaseURL: "https://insta-user-data-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "insta-user-data",
  storageBucket: "insta-user-data.appspot.com",
  messagingSenderId: "417853896199",
  appId: "1:417853896199:web:0dacd7ab55a31cb60a5ca2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage
export default app;
