import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import "../CSS/UI.css";

const Questions = ({ questionToAdd, setQuestionToAdd }) => {
  const { register, control, handleSubmit, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answer'
  });
  const watchFieldArray = watch('answer');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    }
  })
  
  var questionTitle = ""
  var possAnswers = []

  function handleTitleChange(e){
    questionTitle = e.target.value
    handleAnswerChange() 
  }

  function handleAnswerChange(){
    var i = 0
    possAnswers = []
    while (i < controlledFields.length) {
      possAnswers.push(controlledFields[i].value)
      i++
    }
    possAnswers.unshift(questionTitle)
    reflectChanges()
  }
  function reflectChanges(){
    console.log(possAnswers)
    //setQuestionToAdd(possAnswers)
  }

  return (
    <div>
      <div classname="loginForm">
        <form>
          <input placeholder="Question" onChange={handleTitleChange}></input>
        </form>
      </div>
      <div>   
        <form onSubmit={handleSubmit(handleAnswerChange)}>
          {fields.map((field, index) => {
            return <div key={field.id}>
              <input {...register(`answer.${index}.value`)} defaultValue="" />
              <button type="button" onClick={() => remove(index)}>X</button>
            </div>
          })}       
          <button type="button" onClick={()=>append({})}>
            + new possible answer
          </button>
          <input type="submit" />
        </form> 
        <br/>
      </div> 
    </div>
  )
}

export default Questions