// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo_LPBo8iGRXn5kJc16ZUpFNvsdsVHxIQ",
  authDomain: "okxdata.firebaseapp.com",
  databaseURL: "https://okxdata-default-rtdb.firebaseio.com",
  projectId: "okxdata",
  storageBucket: "okxdata.appspot.com",
  messagingSenderId: "934678678299",
  appId: "1:934678678299:web:2a40a5a72111cd49fb61be"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const database = getDatabase(firebaseApp);

export { database };