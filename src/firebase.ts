import firebase from "firebase/app";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAhxEczkQiuGubBMAMSr7i0z5d92cOHtZk",
  authDomain: "fir-crud-33ba6.firebaseapp.com",
  projectId: "fir-crud-33ba6",
  storageBucket: "fir-crud-33ba6.appspot.com",
  messagingSenderId: "1008173001928",
  appId: "1:1008173001928:web:f26a98c5a6ae9718a789fd",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
