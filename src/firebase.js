import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA62fYAUYmdq5auH78Et5p7XA1I4SZMFa4",
  authDomain: "react-chatroom-d9c0c.firebaseapp.com",
  projectId: "react-chatroom-d9c0c",
  storageBucket: "react-chatroom-d9c0c.appspot.com",
  messagingSenderId: "706807200998",
  appId: "1:706807200998:web:7e11ea436507464e8f0f27",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// For authentication
export const auth = getAuth();

// For cloud image storage
export const storage = getStorage();

// For using firebase db => firestore
export const db = getFirestore(app);
