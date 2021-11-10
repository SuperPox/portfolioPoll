import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';



const SimpleNew = ({setApplicant}) => {
    
    const [question, setquestion] = useState("q")
    useEffect(()=>{update()},[question])
    
    const [answerArr, setAnswerArr] = useState([{ id: uuidv4(), pa: "" }])
    useEffect(()=>{update()}, [answerArr])

    const [final, setFinal] = useState({ })
    useEffect(()=>{deliverable()}, [final])

    const [qID, setQID] = useState(uuidv4()) 
    
    /////////////////////////////////////////////////////////
    

    const changequestion = (e) => {
        setquestion(e.target.value)
    }

    const change = (id, e) => {      
        var newArr = [...answerArr]
        var targetIndex = newArr.findIndex(x => x.id === id)
        newArr[targetIndex].pa = e.target.value
        setAnswerArr(newArr)
    }

    const add = () => {
        setAnswerArr([...answerArr, { id: uuidv4(), pa: "" }])
    }

    const remove = (id, e) => {
        e.preventDefault()
        var newArr = [...answerArr]
        newArr.splice(newArr.findIndex(value => value.id === id), 1);
        setAnswerArr(newArr)
    }

    const update = () => {
        var updatedObject = {}
        updatedObject.q = question
        updatedObject.id = qID

        var strippedPaArr = []
        for (let i = 0; i < answerArr.length; i++){
            var paToAdd = answerArr[i].pa
            strippedPaArr.push(paToAdd)
        }
        
        var updatedArr = strippedPaArr  
        var tempSource = {}
        for (let i = 0; i < updatedArr.length; i++){
            var qkey = "a" + i.toString()
            tempSource[qkey] = updatedArr[i] 
        }
        Object.assign(updatedObject, tempSource)

        var tempSource2 = {}
        for (let e = 0; e < updatedArr.length; e++){
            var qrkey = "ar" + e.toString()
            tempSource2[qrkey] = 0
        }
        Object.assign(updatedObject, tempSource2)
        
        setFinal(updatedObject)    
    }

    const deliverable = () => {
        //console.log("Deliverable: ", final)
        setApplicant(final)
    }

    return (
        <div>
            <br/>
            <br/>
            <form>
            <input
                placeholder="new Question"
                value={final.q}
                onChange={e =>changequestion(e)}
            />
            {answerArr.map((answerArr, index) => 
                <div key={index}>
                    <input
                        placeholder="new possible answer"
                        value={answerArr.pa}
                        onChange={e=>change(answerArr.id,e)}
                    />
                    <button onClick={e=>remove(answerArr.id,e)}>X</button>
                </div>)}   
            </form>
            <button onClick={()=>add()}>+</button>
            <br/>
            <br/>
        </div>
    )
}

export default SimpleNew
