import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import

const firebaseConfig = {
  apiKey: "AIzaSyBX--tvBoK-m05X_-0z348IwvRBDAXJqhE",
  authDomain: "trashtrack-67d11.firebaseapp.com",
  databaseURL: "https://trashtrack-67d11-default-rtdb.firebaseio.com",
  projectId: "trashtrack-67d11",
  storageBucket: "trashtrack-67d11.firebasestorage.app",
  messagingSenderId: "891478706008",
  appId: "1:891478706008:web:070b435f9a86e284e3072d",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// const firestore = getFirestore(app);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Set persistence to AsyncStorage
});

// Export auth directly
export { auth };
export default app;
