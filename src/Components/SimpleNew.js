import React, {useState, useEffect} from 'react'

const SimpleNew = () => {

    const [title, setTitle] = useState()
    useEffect(()=>{update()},[title])
    
    const [answerArr, setAnswerArr] = useState([ 0, 1, 2 ])
    useEffect(()=>{update()}, [answerArr])

    const [final, setFinal] = useState()


    const changeTitle = (e) => {
        setTitle(e.target.value)
    }


    const change = (index, e) => {      
        var newArr = [...answerArr]
        newArr[index] = e.target.value
        setAnswerArr(newArr)
    }

    const add = () => {
        setAnswerArr([...answerArr, "_"])
    }

    const remove = (index) => {
        var newArr = [...answerArr]
        //newArr.splice(newArr.findIndex(value => value.index === index), 1);
        newArr.splice(index, 1)
        setAnswerArr(newArr)
    }

    const update = () => {
        var updatedTitle = title
        var updatedArr = [...answerArr]
        updatedArr.unshift(updatedTitle)
        setFinal(updatedArr)
    }



    return (
        <div>
            simple
            <form>
            <input
                placeholder="new Question"
                onChange={e =>changeTitle(e)}
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
            ------- <br/>
            Final: {final} <br/>
            -------
        </div>
    )
}

export default SimpleNew
