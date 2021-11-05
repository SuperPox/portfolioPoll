import React, {useState, useEffect} from 'react'

const SimpleNew = () => {

    const [ answerArr, setAnswerArr ] = useState([ 1, 2, 3 ])
    useEffect(() => { AnswerArrChanged()}, [answerArr])

    function AnswerArrChanged() {
        //console.log("change")
    }


    const change = (index, e) => {
        var newArr = answerArr
        newArr[index] = e.target.value
        setAnswerArr(newArr)
    }

    const add = () => {
        setAnswerArr([...answerArr, "x"])
    }

    const remove = (index) => {
        var newArr = [...answerArr]
        newArr.splice(index, 1)
        setAnswerArr(newArr)
    }

    return (
        <div>
            simple
            <form>
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
            {answerArr}
            <br/>
            -------
        </div>
    )
}

export default SimpleNew
