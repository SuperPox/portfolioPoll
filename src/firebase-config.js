import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXHxzzJRzy7NNWEmwpqGqWeJOAKtmk4CE",
  authDomain: "polly-easypoll.firebaseapp.com",
  projectId: "polly-easypoll",
  storageBucket: "polly-easypoll.appspot.com",
  messagingSenderId: "611405436694",
  appId: "1:611405436694:web:2577f3be4925023de8a237",
  measurementId: "G-J4C0N3J4YT"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);


