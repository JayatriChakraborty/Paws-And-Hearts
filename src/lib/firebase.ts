
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6yaPqFarOlBD1hSGJwUyTT98DdhNmx_s",
  authDomain: "paws-and-hearts.firebaseapp.com",
  projectId: "paws-and-hearts",
  storageBucket: "paws-and-hearts.appspot.com",
  messagingSenderId: "573466940080",
  appId: "1:573466940080:web:737f401157c4338eff2175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
