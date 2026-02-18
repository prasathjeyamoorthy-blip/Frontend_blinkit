// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCUq94zAN_D4v-gqQb-5fbCiQ3pEtdmLI8",
  authDomain: "blinkit-6f5cc.firebaseapp.com",
  projectId: "blinkit-6f5cc",
  storageBucket: "blinkit-6f5cc.firebasestorage.app",
  messagingSenderId: "419440656817",
  appId: "1:419440656817:web:beec73f44d8a5ba6db7d90",
  measurementId: "G-GPEDRFR0EQ",
};

// Initialize app
const app = initializeApp(firebaseConfig);

// Initialize auth
export const auth = getAuth(app);
