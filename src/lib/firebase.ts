import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDePAg0Wn9ZdIq0Ysg5Br7mSOGpjiyMiJw",
  authDomain: "homescope360-2baa1.firebaseapp.com",
  projectId: "homescope360-2baa1",
  storageBucket: "homescope360-2baa1.firebasestorage.app",
  messagingSenderId: "917469318088",
  appId: "1:917469318088:web:0bb56ce2cf4aff41224efd",
  measurementId: "G-JXSE4HTY2M",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
