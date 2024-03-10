import React, { useState } from "react";
import './SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function SignIn(){
    const navigate=useNavigate();
    const [msg,setMsg]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');



    const handlePrevious=()=>{
        navigate('/');
    };


    const handleSubmit= async (e)=>{
        e.preventDefault();
      
        
        try{
            const response= await fetch('http://localhost:3001/signIn',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
         });

      const data= await response.json();
      const msg=document.getElementById('msg');


      if(response.ok){
        msg.style.color="green";
        setMsg(data.message);
      }
      else{
        msg.style.color="red";
        setMsg(data.message);
      }
    

        }catch(error){
console.log('error fetching data:',error);
        }
    }

    return(
        <div className="signin-container">
             <div className="leftArrow" onClick={handlePrevious}>
      <FontAwesomeIcon  icon={faArrowLeft} />
    </div>
        <h2>Sign In</h2>
       
        <form className="signin-form">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button  onClick={handleSubmit}>Sign In</button>
            <p id="msg">{msg}</p>
        </form>
      
    </div>
    );
}

export default SignIn;