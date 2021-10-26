import React from 'react'
import { useForm } from 'react-hook-form';
import "../CSS/UI.css";

import firebaseApp from '../Config/FirebaseApp'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
const auth = getAuth(firebaseApp);

export default function SignUp() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    
    const onSubmit = (data, event) => {
        const email = data.email;
        const password = data.password;
        AttemptSignIn(email, password)
    }

    function AttemptSignIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
            const user = userCredential.user;
        })
        .catch ((error) => {
            console.log(error.message);
            if (error.message != null){
                AttemptSignUp(email, password);
            }
        })
    }

    function AttemptSignUp(email, password){
        createUserWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log(error.message);
        })
    }




    return ( 
        <div className="loginForm">
            <h2>Login or Signup</h2>        
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="email" placeholder="email" name="email" 
                {...register('email', {
                    required: "email required",
                })}/> <br/>
                {errors.email && <span>{errors.email.message}</span>}
                
                <br/>
                <input type="password" placeholder="password" name="password" 
                {...register('password', { 
                    required: "password required",
                    minLength: {value: 6, message: "password must be atleast 6 characters"}
                })}/> <br/> 
                {errors.password && <span>{errors.password.message}</span>}           
                <br/>

                <button type="submit">submit</button>
            </form>
        </div>
    );
}
