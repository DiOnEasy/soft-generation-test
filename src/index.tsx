import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUN3ZgbHmbCxtmwu-ubX7n6tKd8t_o8Po",
  authDomain: "softgen-test.firebaseapp.com",
  projectId: "softgen-test",
  storageBucket: "softgen-test.appspot.com",
  messagingSenderId: "181495755235",
  appId: "1:181495755235:web:5e04b5a57ad22b0cbd70d6",
};

console.log(process.env.REACT_APP_SECRET)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
);
