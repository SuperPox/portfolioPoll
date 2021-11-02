import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField'

const NewQuestion = ({setNewData}) => {

    const [currentQuestion, setCurrentQuestion] = useState()
    useEffect(() => {
        updateFieldsToReflectTitleChange()
    }, [currentQuestion])
    
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), possQuestion: '', possAnswer: '', responses: 0 },
    ])
    useEffect(() => {
        somethingChanged()
    }, [inputFields])

    const handleChangeTitle = (event) => {
        setCurrentQuestion(event.target.value)
    }

    function updateFieldsToReflectTitleChange(){
        const values = [...inputFields]
        var target = 'possQuestion'
        var i = 0
        while (i < values.length){
            values[i][target] = currentQuestion
            i++
        }
        //console.log("changed possQuestion",values)
        setInputFields(values);
    }

    const handleChangeInput = (id, event) => {
        var target = 'possQuestion'
        const newInputFields = inputFields.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
            i[target] = currentQuestion
          }
          return i;
        })
        setInputFields(newInputFields);
        //console.log("Changed possAnswers", newInputFields)
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), possQuestion: currentQuestion, possAnswer: "", responses: 0}])
    }

    const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields)
    }

    function somethingChanged(){
        //console.log("InputFields from NewQuestion", inputFields)
        setNewData([inputFields])
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="possQuestion"
                    placeholder="new question"
                    onChange={event => handleChangeTitle(event)}
                />
                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        <TextField variant="standard" 
                            type="text"
                            name="possAnswer"
                            placeholder="new possible answer"
                            value={inputField.possAnswer}
                            onChange={event => handleChangeInput( inputField.id, event )}
                        />
                        <button onClick={() => handleRemoveFields(inputField.id)}>X</button>
                    </div>             
                ))}
            </form>
            <button onClick={() => handleAddFields()}>
                add another possible answer
            </button>
            <button type="submit" onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default NewQuestion
