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
        const title = e.target.formTitle.value;
        const Q1 = e.target.Q1.value;
        const Q1A1 = e.target.Q1A1.value;
        const Q1A2 = e.target.Q1A2.value;
        const Q1A3 = e.target.Q1A3.value;
        const Q1A4 = e.target.Q1A4.value;
        const Q1A5 = e.target.Q1A5.value;
        const test = {t: "t", q1: "q", pa1: "a", pa2: "b"}

        const newPollsArray = [ 
            ...pollsArray, 
            {
                id: +new Date(),
                test: test,
                title: title,
                Q1: Q1,
                Q1A1: Q1A1,
                Q1A2: Q1A2,
                Q1A3: Q1A3,
                Q1A4: Q1A4,
                Q1A5: Q1A5,
                 
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



    

    //////////////////

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
    // Q1
    const [DQ1A1, setDQ1A1] = useState(true)
    useEffect(()=>{Toggle1(DQ1A1)}, [DQ1A1])
    const [BQ1A1, setBQ1A1] = useState()
    function Toggle1(bool){
        if(bool){setBQ1A1("-")}
        else{setBQ1A1("+")}  
    }

    const [DQ1A2, setDQ1A2] = useState(false)
    useEffect(()=>{Toggle2(DQ1A2)}, [DQ1A2])
    const [BQ1A2, setBQ1A2] = useState()
    function Toggle2(bool){
        if(bool){setBQ1A2("-")}
        else{setBQ1A2("+")}  
    }

    const [DQ1A3, setDQ1A3] = useState(false)
    useEffect(()=>{Toggle3(DQ1A3)}, [DQ1A3])
    const [BQ1A3, setBQ1A3] = useState()
    function Toggle3(bool){
        if(bool){setBQ1A3("-")}
        else{setBQ1A3("+")}  
    }

    const [DQ1A4, setDQ1A4] = useState(false)
    useEffect(()=>{Toggle4(DQ1A4)}, [DQ1A4])
    const [BQ1A4, setBQ1A4] = useState()
    function Toggle4(bool){
        if(bool){setBQ1A4("-")}
        else{setBQ1A4("+")}  
    }

    const [DQ1A5, setDQ1A5] = useState(false)
    useEffect(()=>{Toggle5(DQ1A5)}, [DQ1A5])
    const [BQ1A5, setBQ1A5] = useState()
    function Toggle5(bool){
        if(bool){setBQ1A5("-")}
        else{setBQ1A5("+")}  
    }

    return (
        <div>
            <h4>Create a New Poll</h4>
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
            <br/>
            <form onSubmit={createPoll}>
                <input type="text" placeholder="new poll title" id="formTitle"></input>
                <br/><br/>
                <input id="Q1" placeholder="Q1"></input>
                <div>
                    {DQ1A1?<input id="Q1A1" placeholder="Q1A1" defaultValue=""></input>:null}
                    <button type="button" onClick={()=>setDQ1A1(!DQ1A1)}>{BQ1A1}</button>            
                </div>
                {DQ1A1?<div>
                    {DQ1A2?<input id="Q1A2" placeholder="Q1A2" defaultValue=""></input>:null}
                    <button type="button" onClick={()=>setDQ1A2(!DQ1A2)}>{BQ1A2}</button>            
                </div> :null}
                {DQ1A2?<div>
                    {DQ1A3?<input id="Q1A3" placeholder="Q1A3" defaultValue=""></input>:null}
                    <button type="button" onClick={()=>setDQ1A3(!DQ1A3)}>{BQ1A3}</button>            
                </div>:null}
                {DQ1A3?<div>
                    {DQ1A4?<input id="Q1A4" placeholder="Q1A4" defaultValue=""></input>:null}
                    <button type="button" onClick={()=>setDQ1A4(!DQ1A4)}>{BQ1A4}</button>            
                </div>:null}
                {DQ1A4?<div>
                    {DQ1A5?<input id="Q1A5" placeholder="Q1A5" defaultValue=""></input>:null}
                    <button type="button" onClick={()=>setDQ1A5(!DQ1A5)}>{BQ1A5}</button>            
                </div>:null}
                <br/>
                <button type="submit">submit</button>
            </form>
            <br/>

            
        </div>
    )
}

export default New


