import React, { useContext, useEffect, useState } from 'react'
import './landigPage.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../more/Nav';
import LeftNav from '../more/LeftNav';
import { useUser } from '../contexts/AuthContext';



export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState(['up','up']);
  const handleIcon1Title = ()=>{

  if(direction[0] == 'down'){
      setDirection(
      prevdirec  => ['up', direction[1]]
      )
    } 
  else{
       setDirection( prevdirec => ['down', direction[1]])
      }
    };
const handleIcon2Title = () => {
    if(direction[1] == 'down'){
      setDirection(
      prevdirec => [direction[0], 'up']
      )
    } 
  else{
       setDirection( prevdirec => [direction[0], 'down'])
      }
      document.getElementsByClassName('scHomeStep').style = 'display = none';
    };

const { user, task_group, setTask_group, setUser, token} = useUser();

var navigate = useNavigate();
useEffect(()=>{
  if(!localStorage.getItem('token')){
    navigate('/')
  }
},[])
// recently visited tasks
const [recentlyTasks, setrecentlyTasks] =useState(task_group ? task_group.map((element)=> ({task_group_name : element.name, tasks : element.tasks}) ).flat(): []);
const sortedTasks =  [...recentlyTasks].sort((a, b) => {
  return new Date(b.updated_at) - new Date(a.updated_at);
}).slice(0, 4);;

// recently visited workSpaces
const [workSpaces, setworkSpaces] = useState(task_group ? task_group.map((element)=>element.name) : [])
const sortedworkSpaces = [...workSpaces].sort((a,b)=>{
  return new Date(b.updated_at) - new Date(a.updated_at);
}).slice(0, 2);
useEffect(()=>{

  // recently visited tasks
  setrecentlyTasks(
    task_group.map((element)=>  element.tasks.map((item)=>({
    task_group_name: element.name,
    ...item,
  }),
)).flat())

  // recently visited workSpaces
setworkSpaces(task_group ? task_group.map((element)=>({name: element.name, updated_at: element.updated_at})) : [])

},[task_group])

  return (
    <>
      <Nav user={user} />

      <div className="content">

        <LeftNav data={{ task_group, user, setUser, setTask_group, token }} />
        
        <div className="desktop">
          <div className='headbar'>
            <div className='HomeTitle'>
              {user ? (<p>Good afternoon, {user.name}!</p>) : (<p>Good afternoon, landing...</p>)}
              <h2>Quickly access your recent boards, Inbox and workspaces</h2>
            </div>
            <div className='headbarBtns'>
              <button className='feedback'><i className="bi bi-chat-heart"></i> Give feedback</button>
              <button className='quickSearch'><i className="bi bi-lightning-charge"></i> Quick Search</button>
            </div>
          </div>
          <div className="betweenDivs"></div>
          <div className="HomeContent">                                  
            <h3 className='firstHomeStepTitle' onClick={handleIcon1Title}><i className={`bi bi-caret-${direction[0]}-fill`}></i>  Recently visited</h3>
            <div className='firstHomeStep' style={{ display: direction[0] == 'down' ? 'none' : 'flex' }}>

              {/* <div className='RecentlyCarts'>
                <img src="../../../../public/taskImg.png" alt="" />
                <section>
                  <i className="bi bi-card-list"></i>
                  <h2>see how it work</h2>
                  <i className="bi bi-star"></i>
                </section>
                <div className="brand">
                  <h1>H<span>z</span></h1>
                  <div style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>work management &gt; main workspace</div>
                </div>
              </div>


              <div className='RecentlyCarts'>
                <img src="../../../../public/taskImg.png" alt="" />
                <section>
                  <i className="bi bi-card-list"></i>
                  <h2>see how it work</h2>
                  <i className="bi bi-star"></i>
                </section>
                <div className="brand">
                  <h1>H<span>z</span></h1>
                  <div style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>work management &gt; main workspace</div>
                </div>
              </div>


              <div className='RecentlyCarts'>
                <img src="../../../../public/taskImg.png" alt="" />
                <section>
                  <i className="bi bi-card-list"></i>
                  <h2>see how it work</h2>
                  <i className="bi bi-star"></i>
                </section>
                <div className="brand">
                  <h1>H<span>z</span></h1>
                  <div style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>work management &gt; main workspace</div>
                </div>
              </div> */}
              {
                sortedworkSpaces.length > 0 ?
              sortedTasks.map((element,index)=>(
                <div className='RecentlyCarts' key={index}>
                <img src="../../../../public/taskImg.png" alt="" />
                <section>
                  <i className="bi bi-card-list"></i>
                  <h2>{element.title}</h2>
                  <i className="bi bi-star"></i>
                </section>
                <div className="brand">
                  <h1>H<span>z</span></h1>
                  <div style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>work management &gt; {element.task_group_name}</div>
                </div>
              </div>
  
              ))
              :
              <></>
           
            }

            
            </div>

            <h3 className='scHomeStepTitle' onClick={handleIcon2Title}><i className={`bi bi-caret-${direction[1]}-fill`}></i>  My workspace</h3>
            <div className="scHomeStep" style={{ display: direction[1] == 'down' ? 'none' : 'flex' }}>

              {
                sortedworkSpaces.length > 0 ?
              sortedworkSpaces.map((element,index)=>(
                <div className="workspacesView" key={index}>
                <div className='workspacesViewLogo'>{element.name ? element.name[0]:''}</div>
                <div className='inWorkspacesView'>
                  <p>{element.name}</p>
                  <div className="brand">
                    <h1>H<span>z</span></h1>
                    <div style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>work management</div>
                  </div>
                </div>
              </div>
              ))
            :
            <></>
            }
              

            </div>


          </div>
        </div>
      </div>
    </>
  )
}
