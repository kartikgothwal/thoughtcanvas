// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
 import { Auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
type FirebaseConfigType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};
const firebaseConfig: FirebaseConfigType = {
  apiKey: "AIzaSyDr0qaz9AllEEEWzuZ6dO1hsBtOuNm59WM",
  authDomain: "thoughtcanvas-c476b.firebaseapp.com",
  projectId: "thoughtcanvas-c476b",
  storageBucket: "thoughtcanvas-c476b.firebasestorage.app",
  messagingSenderId: "1014496734578",
  appId: "1:1014496734578:web:1b84cd919c212caca001eb",
  measurementId: "G-H2P0F5NED4",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
 
export { app, auth };
