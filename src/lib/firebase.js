import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ8ZVIrDm1owkFZE-2hhusI8HUXakEk10",
  authDomain: "carrental-6de1e.firebaseapp.com",
  projectId: "carrental-6de1e",
  storageBucket: "carrental-6de1e.appspot.com",
  messagingSenderId: "400935278537",
  appId: "1:400935278537:web:de7b47d196a16db8783a18",
  measurementId: "G-N8RM4EPLFY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);