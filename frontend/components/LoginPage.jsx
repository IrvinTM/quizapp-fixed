// Import the functions you need from the SDKs you need
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, connectAuthEmulator} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Firebase configuration objectis completely safe to include on the client side it is just the library talking to the project in Firebase
// Besides the login form I will not have anything on the firebase project like firestore it will be handled through another channel

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfRTkSja1pxKojdF8dGiUYxKWn2BXoBFY",
    authDomain: "shake-and-bake-2cb75.firebaseapp.com",
    projectId: "shake-and-bake-2cb75",
    storageBucket: "shake-and-bake-2cb75.firebasestorage.app",
    messagingSenderId: "982380557687",
    appId: "1:982380557687:web:376fbb7a532fe2afc61d72",
    measurementId: "G-6LEQYWJEPV"
  };



export default function LoginPage() {

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

connectAuthEmulator(auth, "http://localhost:9099")

return (
    <>
    </>
)
}