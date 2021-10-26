import React from 'react'

import firebaseApp from '../Config/FirebaseApp'
import { getAuth, signOut } from "firebase/auth"
const auth = getAuth(firebaseApp);

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            <button onClick={()=> signOut(auth)}>sign out</button>
        </div>
    )
}

export default Home
