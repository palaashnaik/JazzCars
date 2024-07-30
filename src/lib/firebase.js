import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    
  apiKey: "AIzaSyD5zM1z_ybLwKSvokm9MuvTi0lMNXlYeeo",
  authDomain: "jazzcarrentals-28c6b.firebaseapp.com",
  projectId: "jazzcarrentals-28c6b",
  storageBucket: "jazzcarrentals-28c6b.appspot.com",
  messagingSenderId: "803297794651",
  appId: "1:803297794651:web:84a59d8507f8847795fd7e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);