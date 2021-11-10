import React, {useState, useEffect} from 'react'
import "../CSS/Form.css";
import { v4 as uuidv4 } from 'uuid';

import SimpleNew from './SimpleNew';

import firebaseApp from '../Config/FirebaseApp';
import { getFirestore, updateDoc, doc } from '@firebase/firestore';
const firestore = getFirestore(firebaseApp);

const New = ({userEmail, setPollsArray, pollsArray}) => {     
    async function createPoll(e) {
        e.preventDefault();
        console.log("creating poll")
        const title = e.target.formTitle.value;

        const newPollsArray = [ 
            ...pollsArray, 
            {
                id: +new Date(),
                title: title,
                pollQAs: master,
                 
            },
        ];
        const docRef = doc(firestore, `users/${userEmail}`)
        updateDoc(docRef, { polls: [...newPollsArray] })
        setPollsArray(newPollsArray);
        e.target.formTitle.value = ""
    }
    ////////////////////

    const [componentArray, setcomponentArray] = useState([ {id: uuidv4()}])
    useEffect(() => {updatecomponentArray()}, [componentArray])

    const addQuestion = () => {
        setcomponentArray([...componentArray, {id: uuidv4()}])
    }

    const updatecomponentArray = () => {
        console.log("cArr = ", componentArray)
    }

    const updateCID = () => {
        var qIndexToGet = master.length - 1
        var qIdToGet = master[qIndexToGet].id
        var newArr = componentArray
        var cIndexToGet = newArr.length - 1
        newArr[cIndexToGet].id = qIdToGet
        setcomponentArray(newArr)   
    }

    const removeC = id => {
        const newCArr = [...componentArray]
        newCArr.splice(newCArr.findIndex(q => q.id === id), 1)
        setcomponentArray(newCArr)
        removeCfromMaster(id)
    }

    const removeCfromMaster = (id) => {
        //console.log("C to remove: ", id)
        var newMaster = [...master]
        var index = newMaster.findIndex(e => e.id === id)
        newMaster.splice(index, 1)
        //console.log("newMaster after removal", newMaster)
        setMaster(newMaster)
    }

    ///////

    const [applicant, setApplicant] = useState()
    useEffect(()=>{check()}, [applicant])

    const [master, setMaster] = useState([])
    useEffect(()=>{masterLog()}, [master])

    const check = () => {
        if (applicant !== undefined){
            if (applicant.id !== undefined){
                var newArr = master;
                var match = newArr.find(e => e.id === applicant.id)
                if (match === undefined){
                    newArr.push(applicant)
                }
                else { // if we do have a match -replace it in the array
                    var index = newArr.findIndex(i => i.id === applicant.id);
                    newArr[index] = applicant;
                }
                //console.log("newArr: ", newArr);
                setMaster(newArr);
                //console.log("masterAfterCheck: ", master);
                updateCID()
            }                
        }
    }

    const masterLog = () => {
        console.log("masterLog: ",master)
    }

    

    /////////////////


    return (
        <div>
            <h4>Create a New Poll</h4>
            <form onSubmit={createPoll}>
                <input type="text" placeholder="new poll title" id="formTitle"></input>
                {componentArray.map((qArr, index) =>
                    <div key={index}>
                        <SimpleNew setApplicant={setApplicant} />
                        <button onClick={()=>removeC(qArr.id)}>^Remove Question^</button>
                    </div>
                )}
                <br/>
                <button onClick={()=>addQuestion()}>Add New Question</button>


                <br/>
                <br/>
                ------------------------------------------
                <br/>
                <button type="submit">submit</button>
            </form>
            <br/>

            
        </div>
    )
}

export default New


