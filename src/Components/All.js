import React from 'react'

import firebaseApp from '../Config/FirebaseApp';
import { getFirestore, updateDoc, doc } from '@firebase/firestore';
const firestore = getFirestore(firebaseApp);

const All = ({ pollsArray, userEmail, setPollsArray, pollToInspect, setPollToInspect }) => {
    async function deletePoll(pollIDToDelete){
        const newPollsArray = pollsArray.filter(
            (pollObject) => pollObject.id !== pollIDToDelete
        );
        const docRef = doc(firestore, `users/${userEmail}`);
        updateDoc(docRef, { polls: [...newPollsArray]});
        setPollsArray(newPollsArray);
    }

    function inspectPoll(pollOBJ){
        setPollToInspect(pollOBJ.id);
    }


    return (
        <div>
            <h2>All</h2>
            <div>
                {pollsArray.map((pollObject) => {
                    return (
                       <p> 
                           <button onClick={() => inspectPoll(pollObject)}>{pollObject.title}</button> 
                           <button onClick={() => deletePoll(pollObject.id)}> X </button> 
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default All
