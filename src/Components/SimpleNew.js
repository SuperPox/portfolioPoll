import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';



const SimpleNew = ({setApplicant}) => {
    
    const [question, setquestion] = useState("q")
    useEffect(()=>{update()},[question])
    
    const [answerArr, setAnswerArr] = useState([ ])
    useEffect(()=>{update()}, [answerArr])

    const [final, setFinal] = useState({ })
    useEffect(()=>{deliverable()}, [final])

    const [qID, setQID] = useState(uuidv4()) 

    const [toggle, setToggle] = useState("x")

    
    /////////////////////////////////////////////////////////
    

    const changequestion = (e) => {
        setquestion(e.target.value)
    }

    const change = (index, e) => {      
        var newArr = [...answerArr]
        newArr[index] = e.target.value
        setAnswerArr(newArr)
    }

    const add = () => {
        setAnswerArr([...answerArr, "x"])
        //console.log("ADD")
    }

    const remove = (index) => {
        var newArr = [...answerArr]
        console.log("pa index: ", index)
        //newArr.splice(newArr.findIndex(value => value.index === index), 1);
        newArr.splice(index, 1)
        setAnswerArr(newArr)
    }

    const update = () => {
        var updatedObject = {}
        updatedObject.q = question

        updatedObject.id = qID
        
        var updatedArr = answerArr  //if I add ids I need to watch for that here
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
            {answerArr.map( (aArr, index) => 
                <div key={index}>
                    <input
                        placeholder="new possible answer"
                        onChange={e=>change(index,e)}
                        key={index}
                    />
                    <button onClick={()=>remove(index)}>X</button> 
                </div>)}   
            </form>
            <button onClick={()=>add()}>+</button>
            <br/>
            <br/>
        </div>
    )
}

export default SimpleNew
