// Import required Firebase modules
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Firebase configuration object (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDhyTNWw8yUsK3-FOfGgmAX86RuAlP4qqw",
  authDomain: "eventorganizerapp-c9122.firebaseapp.com",
  projectId: "eventorganizerapp-c9122",
  storageBucket: "eventorganizerapp-c9122.firebasestorage.app",
  messagingSenderId: "41878882716",
  appId: "1:41878882716:web:07ab17619f83eaeab82059",
  measurementId: "G-X8VFJ8PW1T"
};


// Initialize Firebase only if it hasn't been initialized already
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
