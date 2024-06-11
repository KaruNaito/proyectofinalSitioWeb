import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ82PffI2DKFv84xHKo9XjzcSgDu0kwZQ",
  authDomain: "proyectofinal-f7fa6.firebaseapp.com",
  projectId: "proyectofinal-f7fa6",
  storageBucket: "proyectofinal-f7fa6.appspot.com",
  messagingSenderId: "90836417649",
  appId: "1:90836417649:web:8fdb038140aeac1187efd0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };