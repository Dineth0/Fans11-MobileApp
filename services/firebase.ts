import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// @ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXin4VwF9IuBriqUsqlMat4MtKCHugpWY",
  authDomain: "fans11-97e69.firebaseapp.com",
  projectId: "fans11-97e69",
  storageBucket: "fans11-97e69.firebasestorage.app",
  messagingSenderId: "308074063251",
  appId: "1:308074063251:web:c21af0cf4398639ee53466"
};

const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);