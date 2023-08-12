import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    appId               : import.meta.env.VITE_FIREBASE_APP_ID,
    apiKey              : import.meta.env.VITE_FIREBASE_API_KEY,
    projectId           : import.meta.env.VITE_FIREBASE_PROJECT_ID,
    authDomain          : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    storageBucket       : import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    databaseURL         : import.meta.env.VITE_FIREBASE_DB_URL,
    messagingSenderId   : import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    measurementId       : import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const firebaseApp    = initializeApp(firebaseConfig)
export const firebaseAuth   = getAuth(firebaseApp)