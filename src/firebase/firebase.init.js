// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNklnQOw1y6r7rPoo8MFSN2hldXQQ-BFc",
  authDomain: "smart-deals-17714.firebaseapp.com",
  projectId: "smart-deals-17714",
  storageBucket: "smart-deals-17714.firebasestorage.app",
  messagingSenderId: "961738547019",
  appId: "1:961738547019:web:6572b75bdb1b1455c912ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);