import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAXHxzzJRzy7NNWEmwpqGqWeJOAKtmk4CE",
  authDomain: "polly-easypoll.firebaseapp.com",
  projectId: "polly-easypoll",
  storageBucket: "polly-easypoll.appspot.com",
  messagingSenderId: "611405436694",
  appId: "1:611405436694:web:2577f3be4925023de8a237",
  measurementId: "G-J4C0N3J4YT"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
