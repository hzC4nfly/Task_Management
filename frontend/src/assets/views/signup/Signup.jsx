import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './signup.css'
import LeftFormSide from './LeftFormSide.jsx'
import SocialForms from './SocialForms.jsx'
import axios from 'axios'


export default function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  let navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const FIRSTname = (e) => {
    setFirstName(e.target.value);
  }
  const LASTname = (e) => {
    setLastName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
   const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const UserRegister = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        'http://localhost:8000/api/signup', 
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }/* ,
        { headers: { 'Content-Type': 'application/json' } } */
      );
      localStorage.setItem("token", res.data.token);
      setMessage(res.data.message);
      setPassword("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setErrors({});
      navigate("/home");
    }
     catch (e) {
      if(e.response.data.errors){
        if(e.response.data.errors.firstname){
        setErrors(prevErrors => ({
        ...prevErrors, 
        firstname:e.response.data.errors.firstname[0] 
        }));
        }
        if(e.response.data.errors.lastname){
        setErrors(prevErrors => ({
        ...prevErrors, 
        lastname:e.response.data.errors.lastname[0] 
        }));
        }
        if(e.response.data.errors.email){
        setErrors(prevErrors => ({
        ...prevErrors, 
        email:e.response.data.errors.email[0] 
        }));
        }
        if(e.response.data.errors.password){
        setErrors(prevErrors => ({
        ...prevErrors, 
        password:e.response.data.errors.password[0] 
        }));
        }
      }
      else{
        setErrors(prevErrors => ({
        ...prevErrors, 
        antherErr: "something is wrong ❌"
        }));
      }
    }
  }
  

  useEffect(()=>{

      localStorage.removeItem('token');
      
    },[])
  return (
    <div className='SignBody'>
      <div className="brandRsPhones">
          <h1>H<span>z</span></h1>
          <label><span>one</span> of <span>one</span></label>
        </div>
      <div className='contentDiv'>
        <LeftFormSide />
        <div id='SignDiv'>
          <form onSubmit={UserRegister} method="post" id='SignFrom'>
            {message && <p className='GreenMessage'>{message}</p>}
            {errors.antherErr && <p className='redError'>{errors.antherErr}</p>}
            <div className="head">
              <h2>create an account</h2>
              <p>Already have an account? <Link to='/login'>log in</Link></p>
            </div>
            <div className="inputs">

              <div className='username'>
               <div>
                <input type="text" name="firstname" id="firstname" placeholder='first name' value={firstname} onChange={FIRSTname} />
                {errors.firstname && <p style={{ color: "red" , fontSize: "13px", marginLeft: "13px"}}>{errors.firstname}</p>}
               </div>
                
               <div>
                <input type="text" name="lastname" id="lastname" placeholder='last name' value={lastname} onChange={LASTname} />
                {errors.lastname && <p style={{ color: "red" , fontSize: "13px", marginLeft: "13px"}}>{errors.lastname}</p>}
               </div>
                

              </div>
            
             <div>
              <input type="email" name="email" id="emailInput" value={email} placeholder='adresse email' onChange={handleEmail} />
              {errors.email && <p style={{ color: "red" , fontSize: "13px", marginLeft: "19px", marginTop: "-10px"}}>{errors.email}</p>}
             </div>
             <div>
              <input type="password" name="password" id="password" value={password} placeholder='enter your password' onChange={handlePassword} />
              {errors.password && <p style={{ color: "red" , fontSize: "13px", marginLeft: "19px", marginTop: "-10px"}}>{errors.password}</p>}
             </div> 
              

              <div  className='agreed'>
                <input type="checkbox" name="checked" id="agreed" checked={isChecked} onChange={handleCheckboxChange}/>
                <p>i agree to the rules</p>
              </div>

              <button type="submit" disabled={!isChecked} className={!isChecked ? 'disButton' : undefined}>create account</button>
            </div>



            <SocialForms title='Or register with' />

          </form>

        </div>
      </div>

      
    </div>
  )
}
