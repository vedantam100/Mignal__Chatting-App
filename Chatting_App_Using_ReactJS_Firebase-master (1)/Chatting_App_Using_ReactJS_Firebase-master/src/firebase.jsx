import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAUh0uoAVkN13K83y2BF9eWUz4TrjViFA0",
  authDomain: "temligram.firebaseapp.com",
  projectId: "temligram",
  storageBucket: "temligram.appspot.com",
  messagingSenderId: "633585714273",
  appId: "1:633585714273:web:80515b81000b5a45b15620",
  measurementId: "G-LS81RTZ6CH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage();
export const db = getFirestore()