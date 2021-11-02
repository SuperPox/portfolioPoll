import React, {useEffect} from 'react'
import firebaseApp from '../Config/FirebaseApp';
import { 
    getFirestore, 
    updateDoc, 
    doc,
    collection,
    getDoc 
} from '@firebase/firestore';

const firestore = getFirestore(firebaseApp);
var currentPollID;

const Builder = ({userEmail, setPollsArray, pollsArray, pollToInspect, setPollToInspect }) => {
    async function createPoll(e) {
        e.preventDefault();
        const title = e.target.formTitle.value;
        const newPollsArray = [ 
            ...pollsArray, 
            {
                id: +new Date(),
                title: title,
            },
        ];
        const docRef = doc(firestore, `users/${userEmail}`)
        updateDoc(docRef, { polls: [...newPollsArray] })
        setPollsArray(newPollsArray);
        e.target.formTitle.value = ""
    }

    useEffect(() => {
        currentPollID = pollToInspect;
        console.log(currentPollID);
        getPoll();
    }, [pollToInspect])

    async function getPoll() {
        var docToGet = doc(firestore, `users/${userEmail}`)
        var data = await getDoc(docToGet)
        if (data.exists()){
            console.log(data.data())
            storeData(data.data())
        }
        else {
            console.log("doc not found")
        }
    }

    function storeData(data){

    }



    
    return (
        <div>
            <h2>Builder</h2>
            <h3>To Inspect: {currentPollID}</h3>
            <form onSubmit={createPoll}>
                <input type="text" placeholder="new poll title" id="formTitle"></input>
                <button type="submit">+</button>
            </form>
        </div>
    )
}

export default Builder
