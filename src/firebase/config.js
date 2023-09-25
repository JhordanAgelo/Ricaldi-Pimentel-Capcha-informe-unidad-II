// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1iyalG89XwbYOhiBUbn4reNKU04ksP-I",
  authDomain: "restaurant-93807.firebaseapp.com",
  projectId: "restaurant-93807",
  storageBucket: "restaurant-93807.appspot.com",
  messagingSenderId: "805708578190",
  appId: "1:805708578190:web:4163fc263195f9a79c78df",
  measurementId: "G-HXF7Z25QP6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app)

