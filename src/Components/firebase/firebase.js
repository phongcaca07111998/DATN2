import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQY-PSVxnZ4wdBHatkFZSlN5YzNJqhajA",
  authDomain: "kltn-346e5.firebaseapp.com",
  projectId: "kltn-346e5",
  storageBucket: "kltn-346e5.appspot.com",
  messagingSenderId: "737867590584",
  appId: "1:737867590584:web:45345ea1d5a06b37983d4d",
  measurementId: "G-QR1XW1Z78Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
