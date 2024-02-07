import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ContextProvider } from "./components/context/ContextProvider.jsx";
import firebase from 'firebase/compat/app';


const firebaseConfig = {
  apiKey: "AIzaSyAgCrlBBdiD3_7pka55z_mxM9mt0AkmL5o",
  authDomain: "ass-firebaseweathertracker.firebaseapp.com",
  projectId: "ass-firebaseweathertracker",
  storageBucket: "ass-firebaseweathertracker.appspot.com",
  messagingSenderId: "1069262725492",
  appId: "1:1069262725492:web:bb5a29399f8679cc924c21",
  measurementId: "G-MT5ZDYNKP6",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
