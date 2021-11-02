import React, { useState, useEffect } from 'react'

import New from './New';
import All from './All';
import Builder from './Builder';

import firebaseApp from '../Config/FirebaseApp'
import { getAuth, signOut } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ userEmail }) => {
    const [pollsArray, setPollsArray] = useState(null)
    const fakeData = [
        { id: 1, title: "testa"},
        { id: 2, title: "testb"},
        { id: 3, title: "testc"}
    ];

    const [pollToInspect, setPollToInspect] = useState(null)

    async function findDocumentOrCreateDocument (documentID){
        const docRef = doc(firestore, `users/${documentID}`)
        const check = await getDoc(docRef);
        if (check.exists()){
            const docInfo = check.data();
            return docInfo.polls;
        } else {
            await setDoc(docRef, { polls: [...fakeData] });
            const check = await getDoc(docRef);
            const docInfo = check.data();
            return docInfo.polls;
        }
    }
    useEffect(() => {
        async function fetchPolls() {
            const fetchedPolls = await findDocumentOrCreateDocument(userEmail);
            setPollsArray(fetchedPolls);
        }
        fetchPolls();
    }, []);

    return (
        <div>
            <button onClick={()=> signOut(auth)}>sign out</button> <br/>
            <h2>Home</h2>
            < New             
                pollsArray={pollsArray}
                setPollsArray={setPollsArray} 
                userEmail={userEmail}            
            />

            <Builder
                pollsArray={pollsArray}
                setPollsArray={setPollsArray} 
                userEmail={userEmail}
                pollToInspect={pollToInspect}
                setPollToInspect={setPollToInspect}   
            />

            <br/>
            { pollsArray ? (
                <All 
                pollsArray={pollsArray}
                userEmail={userEmail}
                setPollsArray={setPollsArray}
                pollToInspect={pollToInspect}
                setPollToInspect={setPollToInspect}
                /> 
            ) : null }
        </div>
    )
}

export default Home
