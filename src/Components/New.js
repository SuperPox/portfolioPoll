import React, { useState, useEffect } from 'react'

import firebaseApp from '../Config/FirebaseApp';
import { getFirestore, updateDoc, doc } from '@firebase/firestore';
const firestore = getFirestore(firebaseApp);

const New = ({userEmail, setPollsArray, pollsArray}) => {     
    async function createPoll(e) {
        e.preventDefault();
        const title = e.target.formTitle.value;
        const newPollsArray = [ 
            ...pollsArray, 
            {
                id: +new Date(),
                title: title,
                Q1: "",
                Q1A1: "",
                Q1A2: "",
                Q1A3: "",
                Q1A4: "",
                Q1A5: "",
                 
            },
        ];
        const docRef = doc(firestore, `users/${userEmail}`)
        updateDoc(docRef, { polls: [...newPollsArray] })
        setPollsArray(newPollsArray);
        e.target.formTitle.value = ""
    }
    /////////////////

   


    return (
        <div>
            Create a new poll
            <form onSubmit={createPoll}>
                <input type="text" placeholder="new poll title" id="formTitle"></input>

                


                <button type="submit">+</button>
            </form>
            <br/>

            <button>New Question</button>
        </div>
    )
}

export default New


