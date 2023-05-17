/*
Description: This file stores the configuration for the application related to Firebase database.
*/

// firebase config key setup

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Please add your own firebase config key here

const firebaseConfig = {
    apiKey: "AIzaSyBQYyrCtKdt7_7xuxZtlJs8qaU6USIvD1A",
    authDomain: "ecommerce-ccd5f.firebaseapp.com",
    projectId: "ecommerce-ccd5f",
    storageBucket: "ecommerce-ccd5f.appspot.com",
    messagingSenderId: "841104175521",
    appId: "1:841104175521:web:d6a26ada44e78b30b19be0",
    measurementId: "G-PBYJ4RYQF8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };