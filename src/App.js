import React, { useState } from "react";
import './App.css';

import SignUp from './Components/SignUp';
import Home from './Components/Home';

import firebaseApp from "./Config/FirebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);




function App() {
  const [userGlobal, setUserGlobal] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if(userFirebase){
      setUserGlobal(userFirebase)
    } else {
      setUserGlobal(null);
    }
  })

  return (
    <div className="App-header">
      <div className="app-Title"> 
        <h1>Polly</h1>
      </div>  
      <>
      {userGlobal ? <Home userEmail={userGlobal.email} /> : <SignUp/>}
      </>
    </div>
  );
}

export default App;
