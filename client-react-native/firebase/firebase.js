import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD1iyalG89XwbYOhiBUbn4reNKU04ksP-I",
    authDomain: "restaurant-93807.firebaseapp.com",
    databaseURL: "https://restaurant-93807-default-rtdb.firebaseio.com",
    projectId: "restaurant-93807",
    storageBucket: "restaurant-93807.appspot.com",
    messagingSenderId: "805708578190",
    appId: "1:805708578190:web:4163fc263195f9a79c78df",
    measurementId: "G-HXF7Z25QP6"
    };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
// Resto de tu aplicación React Native
