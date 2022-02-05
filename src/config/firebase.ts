import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATfuyauIOW2q9YmJUVhpmlwi_j0aQjOeE",
  authDomain: "matura-api-2c7c2.firebaseapp.com",
  projectId: "matura-api-2c7c2",
  storageBucket: "matura-api-2c7c2.appspot.com",
  messagingSenderId: "946332480300",
  appId: "1:946332480300:web:7350ca8f63d5b236bcf289"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {db}