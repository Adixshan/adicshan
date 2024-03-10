import React,{useState} from "react";
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function Login({ onLogin }){
    const navigate=useNavigate();
    const [msg,setMsg]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
   


    const handlePrevious=()=>{
        navigate('/');
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        if (email.trim() !== "") {
            onLogin(email);
          } else {
            alert("Please enter a valid email");
          }


        try{
            const response= await fetch('http://localhost:3001/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
         });

const data= await response.json();

         if(response.ok){
          
            setMsg(data.message);
            navigate('/account');
         }else{
         
            setMsg(data.message);
         }
    

        }catch(error){
console.log('error fetching data:',error);
        }
        

    }


    const handleNewUser=()=>{
        navigate('/signIn');
    }



    return(
        <div className="login-container">
              <div className="leftArrow" onClick={handlePrevious}>
      <FontAwesomeIcon  icon={faArrowLeft} />
    </div>
        <h2>Login</h2>
       
        <form className="login-form">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" onClick={handleSubmit}>Login</button>
            <button className='newUser' onClick={handleNewUser}>newUser</button>
        </form>
        <p id="msg">{msg}</p>
      
    </div>
    );

}

export default Login;