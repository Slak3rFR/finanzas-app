import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    authDomain: "finanzas-app-c9d40.firebaseapp.com",
    apiKey: "AIzaSyBoUzmnbTgn4hSvjE1b7mfXyfG8caLcHaE",
    storageBucket: "finanzas-app-c9d40.firebasestorage.app",
    projectId: "finanzas-app-c9d40",
    appId: "1:424187622399:web:054817ca5b73660c5dedca",
    messagingSenderId: "424187622399",
    measurementId: "G-EN26JCWV9W"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)