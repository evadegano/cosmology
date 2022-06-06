// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import "firebase/firestore"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe8mCxkh8VjeDC6XQahoVJsUt3f2i4X9k",
  authDomain: "cosmology-349905.firebaseapp.com",
  projectId: "cosmology-349905",
  storageBucket: "cosmology-349905.appspot.com",
  messagingSenderId: "769341989286",
  appId: "1:769341989286:web:f02a0006b97a48f9db2f67",
  measurementId: "G-Y4HVZXN0CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const firestore = getFirestore(app)


// export const firestore = getFirestore()

export { auth, googleProvider, firestore }