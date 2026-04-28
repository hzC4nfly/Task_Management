import React, { useState } from "react"
import './nav.css'




export default function Nav(props){
    const [isOpen, setIsOpen] = useState(false);
    return(
    <nav>
        <div className="brand">
          <h1>H<span>z</span></h1>
          <label><span>one</span> of <span>one</span></label>
        </div>


         <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i style={{color:"#fff"}} className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </button>
        
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><button className='btn B1'><i className="fa-solid fa-bell"></i></button></li>
            <li><button className='btn B2'><i className="fa-solid fa-user-plus"></i></button></li>
            <li><button className='btn B3'><i className="fa-solid fa-puzzle-piece"></i></button></li>
            <li><button className='btn B4'><i className="fa-solid fa-search"></i></button></li>
            <li><button className='btn B5'><i className="fa-solid fa-question"></i></button></li>
            <div className='break_line'></div>
            <div className="profile">
                {/* <p>{user.name}</p> */}
              {props.user ? (

                <p>{props.user.name}</p>

              ) : (
                <p>landing...</p>
              )}

              <div className='imgDiv'>
                <img src="../../../../public/prof.jpeg" alt="" />
              </div>

            </div>
          </ul>
        </div>
    </nav>
    )
}
    