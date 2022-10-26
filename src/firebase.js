// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAuvCOaf8J2IzqNPFGqWA7DtRdVy6zlbME",
  authDomain: "item-generator-5bfe2.firebaseapp.com",
  databaseURL: "https://item-generator-5bfe2-default-rtdb.firebaseio.com",
  projectId: "item-generator-5bfe2",
  storageBucket: "item-generator-5bfe2.appspot.com",
  messagingSenderId: "162799052157",
  appId: "1:162799052157:web:ed30e91e8034d690ea9814",
  measurementId: "G-JE5TFQLPCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);