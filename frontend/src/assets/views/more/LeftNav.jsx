import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './leftNav.css'




  function LeftNav(props) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [TaskGroup, setTaskGroup] = useState(localStorage.getItem('TaskGroupName') || '');
    var navigate = useNavigate();
    const handleNavigate =  () => {
      if(location.pathname !== "/home/task"){
        navigate('/home/task', { state: TaskGroup });
      }
    };

    const handleAnimationleftNav = () => {
      console.log(isOpen)
      setIsOpen(!isOpen)
  
      
    }

    const handleNavigateHome =  () => {

      if(location.pathname !== "/home"){
        navigate('/home');
      }
      
    };
    const handleSectionChange = async (e) => {
      setTaskGroup(e.target.value);
       localStorage.setItem('TaskGroupName',  e.target.value)
      /* if(location.pathname == '/home/task'){
        window.location.reload();
      } */
    };
    useEffect(() => {
      setTaskGroup(props.data.task_group[0]?.name || '');
      localStorage.setItem('TaskGroupName', props.data.task_group[0]?.name)
      
    }, [props])
    return (
      
      <div className={ isOpen ? "leftNav testTest" : "leftNav"}>

        <div className='ulDivs'>
          <div className="home" onClick={handleNavigateHome}>
            <a href={undefined}><i className="fa-solid fa-house"></i> <p className='textHome'>Home</p></a>
          </div>
          <div className="myWorks">
            <a href="#"><i className="bi bi-calendar-check"></i> <p className='textMyWorks'>My works</p></a>
          </div>
          <div className="more">
            <a href="#"><i className='bi bi-three-dots'></i> <p className='textMore'>More</p></a>
          </div>
        </div>

        <div className="betweenDivs"></div>

        <div className='workSpace'>
          <div className="workSpaceNavTitle">
            <p>workspaces</p>
            <button><i className='bi bi-three-dots'></i></button>
            <button><i className="fa-solid fa-search" style={{ fontSize: '13px' }}></i></button>
          </div>
  
          <div className="tasks" onClick={handleNavigate}>
            <a href={undefined}><i className="bi bi-list-task"></i> <p className='tasksText'>the tasks</p></a>
          </div>
          <div className="Daskboard">
            <a href="#"><i className="bi bi-clipboard-data"></i> <p className='DaskboardText'>Daskboard and reporting</p></a>
          </div>
        </div>
      <button className={isOpen ? "left-toggle active" : "left-toggle"} onClick={handleAnimationleftNav}>
        <i style={{color:"#fff"}} className={isOpen ? "bi bi-arrow-left-short" : "bi bi-arrow-right-short"}></i>
        </button>
      </div>

    )
  }

export default LeftNav;