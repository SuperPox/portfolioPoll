import React from 'react';
import { useState } from 'react';
import { db } from "./firebase-config";
import {
    collection,
    addDoc
} from "firebase/firestore";

export default function Maker() {
    
    const [newPoll, setNewPoll] = useState("")
    const pollsCollectionRef = collection(db, "polls"); 
    
    const createPoll = async () => {
         await addDoc(pollsCollectionRef, {title: newPoll})
    };
    
    
    return (
        <div>
            <h4>Create a New Poll:</h4>
            <input 
                name="pollTitle" 
                placeholder="New Poll Title..."
                onChange={(event) => {setNewPoll(event.target.value)}} />
            <button 
                onClick={createPoll}>+
            </button>
        </div>
    )
}
