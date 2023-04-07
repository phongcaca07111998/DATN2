// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Register } from "../register/register";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0F1PD8v8wGbIYJm9Rsu0ztjAwX92fUjM",
  authDomain: "doantichhop-dc93c.firebaseapp.com",
  projectId: "doantichhop-dc93c",
  storageBucket: "doantichhop-dc93c.appspot.com",
  messagingSenderId: "160417945086",
  appId: "1:160417945086:web:a5de15a398e5a4fff0dcaf",
  measurementId: "G-S746M9T97S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export default app
export const auth =getAuth(app)
export const storage =getStorage(app)
export const db =getFirestore(app)
