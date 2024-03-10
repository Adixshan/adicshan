
import './App.css';
import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Home.js';
import Login from './Login.js';
import SignIn from './SignIn.js';
import Account  from './Account.js';





function App() {
 
   const [loggedIn, setLoggedIn]=  useState('');
   const [email, setEmail]= useState('');


   const handleLogin = (userEmail) => {
    setLoggedIn(true);
    setEmail(userEmail);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
  };


  return (
    <Router>
    <Routes>
    


    <Route path="/" element={<Home />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/signIn' element={<SignIn />}/>
    <Route path='/account' element={<Account />}/>

    </Routes>
    </Router>


  );
}

export default App;
