import React, { useEffect, useState } from 'react'
import './login.css';
import { Link, useNavigate } from 'react-router-dom'
import LeftFormSide from '../signup/LeftFormSide.jsx'
import SocialForms from '../signup/SocialForms.jsx'
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';


export default function LoginPage() {
  const { login, logout } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  useEffect(()=>{
    localStorage.removeItem('token');
    logout();
  },[])

  const handleMail = (e) => {
    setEmail(e.target.value)
  };
  const handlePassword = (e)=>{
  setPassword(e.target.value)
  };

  const handleLogin = async(e)=>{
  e.preventDefault();
  try {
      const response = await axios.post('http://localhost:8000/api/login', {
      email : email,
      password : password,
    })
    .then(response => {
      if(response.data.email || response.data.password){
      if(response.data.email){
      setErrors({
        email: response.data.email
      });
      }
      if(response.data.password){
      setErrors({
        password: response.data.password
        }); 
      }
     } 
     else{
      localStorage.setItem("token", response.data.token);
      login(response.data.user, response.data.token, response.data.taskgroups)
      setEmail('');
      setPassword('');
      setErrors({});
      window.location.href = "/home";
     }
    }
  
  );
} 
catch (e) {
  /* console.log(e); */

    if(e.response.data.errors){
      if(e.response.data.errors.email){
      setErrors(prevErrors =>({
        ...prevErrors,
        email: e.response.data.errors.email[0]
      }));
    }
    if(e.response.data.errors.password){
      setErrors(prevErrors =>({
        ...prevErrors,
        password: e.response.data.errors.password[0]
      }));
    }
    }
    else {
      setErrors(prevErrors => ({
        ...prevErrors, 
        systemErr: "something is wrong ❌"
        }));
    }
  }
  
  } 

  return (
    <div className='SignBody'>
      <div className="brandRsPhones">
          <h1>H<span>z</span></h1>
          <label><span>one</span> of <span>one</span></label>
        </div>
    <div className='contentDiv'>
      <LeftFormSide />
      <div id='SignDiv'>
        <form onSubmit={handleLogin} method="post" id='SignFrom'>
          {errors.systemErr && <p className='redError'>{errors.systemErr}</p>}
          {/* {errors.systemErr ? (<p className='redError'>{errors.systemErr}</p>) : (<></>) } */}
          <div className="head">
            <h2>login an account</h2>
            <p>do not have an account? <Link to='/signup'>signup</Link></p>
          </div>
          <div className="inputs loginInputs">
            <div>
              <input type="email" name="email" id="emailInput" placeholder='adresse email' value={email} onChange={handleMail} />
              {errors.email && <p style={{ color: "red" , fontSize: "13px", marginLeft: "19px", marginTop: "-10px"}}>{errors.email}</p>}
            </div>
            <div>
              <input type="password" name="password" id="password" placeholder='enter your password' value={password} onChange={handlePassword} />
              {errors.password && <p style={{ color: "red" , fontSize: "13px", marginLeft: "19px", marginTop: "-10px"}}>{errors.password}</p>}
            </div>
            <button type='submit'>login</button>
          </div>

          

          <SocialForms title='login with' id='SocialForms'/>

        </form>

      </div>
    </div>
    </div>
    
  )
}
