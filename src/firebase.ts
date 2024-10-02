// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjfHY69gMLtw9Mk9lASiS8HTgZy2UypWc",
  authDomain: "okx-01.firebaseapp.com",
  databaseURL: "https://okx-01-default-rtdb.firebaseio.com",
  projectId: "okx-01",
  storageBucket: "okx-01.appspot.com",
  messagingSenderId: "83647579861",
  appId: "1:83647579861:web:ad9a777108bea37d91445c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const database = getDatabase(firebaseApp);

export { database };
