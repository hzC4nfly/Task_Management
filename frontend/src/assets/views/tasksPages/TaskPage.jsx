import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './taskPage.css';
import axios from "axios";
import { useUser } from "../contexts/AuthContext";
import LeftNav from "../more/LeftNav";
import Nav from "../more/Nav";



export default function TaskPage() {
  let location = useLocation();

  const { user, task_group, setTask_group, setUser, token } = useUser();
  const [TaskGroup, setTaskGroup] = useState(task_group.length > 0 ? task_group[0].name : '');
  const [taskDetails, setTaskDetails] = useState([]);
  const [delTasks, setDelTasks] = useState([]);

  const [newWorkspace, setNewWorkspace] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForms, setShowForms] = useState([false, false, false]);
  const [isDisabled, setIsDisabled] = useState(delTasks.length > 0 ? false : true);
  const handleClick = () => {
    const newShowForms = [...showForms];
    newShowForms[0] = true;
    setShowForms(newShowForms);
  };

  useEffect(() => {

    if (showForms[0]) {
      document.getElementById('bodyChild').classList.add('blur-background');
    } else {
      document.getElementById('bodyChild').classList.remove('blur-background');
    }
    /*     return () => {
          document.getElementById('bodyChild').classList.remove('blur-background');
        }; */

  }, [showForms[0]]);

  useEffect(() => {
    setIsDisabled(delTasks.length > 0 ? false : true)
    if (isDisabled) {
      if (showForms[2]) {
        document.getElementById('trash').style.opacity = '0.5'
      }
    }
    else {
      if (showForms[2]) {
        document.getElementById('trash').style.opacity = '1'
      }
    }
  }, [delTasks, isDisabled, showForms]);

  useEffect(() => {
    const filteredTasks = task_group.filter(item => item.name === TaskGroup);

    const allDetails = filteredTasks.map(element => element.tasks);

    setTaskDetails(allDetails.flat());
    if (task_group.length == 5) {
      setErrorMessage('you cannot create new workspace you allready have 2');
      if (showForms[0]) {
        document.getElementById('createWorkspaceBtn').disabled = true;
        document.getElementById('createWorkspaceBtn').style.background = 'transparent';
        
      };

    };
  }, [, task_group, TaskGroup,showForms]);

  useEffect(() => {
    if (task_group.length > 0) {
      setTaskGroup(task_group[0].name);
    }
  }, [, task_group]);

  const handleSectionChange = (e) => {
    setTaskGroup(e.target.value);
    delTasks.map((element) => {
      document.getElementById(`ischeck${element.id}`).checked = false;
    });
    setDelTasks([]);
  };

  const handleStatuts = (e, id, field, value, index) => {
    document.getElementById('buttonvalid').style.display = 'flex';
    const updatedTask = taskDetails.map(task =>
      task.id === id ? { ...task, [field]: value } : task
    );
    setTaskDetails(updatedTask);
    const column = document.getElementById(`column${index}`);

    if (e.target.value == 'Done') {
      column.style.background = 'green';
    }

    if (e.target.value == 'Working on it') {
      column.style.background = 'orange';
    }
    if (e.target.value == 'Stuck') {
      column.style.background = 'red';
    }
  };

  const handleUpdate = (id, field, value) => {
    document.getElementById('buttonvalid').style.display = 'flex';
    const updatedTask = taskDetails.map(task =>
      task.id === id ? { ...task, [field]: value } : task
    );
    setTaskDetails(updatedTask);

  };

  /* 'Working on it','Stuck','Done','Not Started' */
  const handleNewTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/home/task-create', {
        userId: user.id,
        task_group_name: TaskGroup,
      }).then(response => {
        if (response.data.message === 'new task created successfully ✅') {
          return window.location.reload();;
        }
        return console.log('null');
      })
    } catch (e) {
      console.log(e)
    }

  };
  const handeldeltask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/home/del-task', delTasks)
        .then(response => {
          if (response.data.message === 'Successfully delete task') {
            return window.location.reload();
          }
          return console.log('you have something wrong so you cannot delete tasks');
        })
    } catch (error) {
      console.log(error)
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/home/task-updates', taskDetails)
        .then(response => {
          if (response.data.message === 'Successfully updated ') {
            return window.location.reload();
          }
          return console.log('you have something wrong so you cannot updated');
        })
    } catch (e) {
      console.log(e)
    }
  };

  const handleBtnaddWorkspaces = async (e) => {
    e.preventDefault();
    if (newWorkspace == '') {
      setErrorMessage('you need to set name for workspace.')
      return false;
    }
    if (/^\d/.test(newWorkspace)) {
      setErrorMessage('you cannot start you workspace name by number.')
      return false;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(newWorkspace)) {
      setErrorMessage('name of workspace cannot contain special characters like !, @, #, etc.')
      return false;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/home/task-newWorkspace',{
      userId: user.id,
      name: newWorkspace
    }).then(res => {
      if(res.data.message == 'Successfully Workspace created!'){
        window.location.reload();
      }
    })
    } catch (error) {
      if(error){
        if(error.response.data.message === 'this workspace name id allready used'){
        setErrorMessage(error.response.data.message)
      }
      }
      
      console.log(error)
    }
    
  };

  const handleDelWorkspace = async (e) => {
    try {
      const response = await axios.post('http://localhost:8000/api/home/del-Workspace',{
        name: TaskGroup,
      })
      .then(res => {
        if(res.data.message == 'Successfully delete workspace'){
          window.location.reload();
        }
      })
    } catch (e) {
      console.log(e)
    }
  };

  const handelShowRightForm = (e) => {
    const newShowForms = [...showForms];
    newShowForms[1] = true;
    setShowForms(newShowForms);
  };
  return (

    <>
      <div id="bodyChild" onClick={() => {
        if (showForms[0]) {
          document.getElementById('bodyChild').classList.remove('blur-background');
          const newShowForms = [...showForms];
          newShowForms[0] = false;
          setShowForms(newShowForms);

        }
        if (showForms[1]) {
          const newShowForms = [...showForms];
          newShowForms[1] = false;
          setShowForms(newShowForms);
        }
      }}>
        <Nav user={user} />
        <div className="content">
          <LeftNav data={{ task_group, user, setUser, setTask_group, token }} />

          <div className="mainContent">
            <div className="header">
              <div className="barHeader">
                <div className='worksSpaces'>
                  <select value={TaskGroup} onChange={handleSectionChange}>

                    {task_group.length !== 0 ? (

                      task_group.map((item, index) => (
                        <option key={index}>{item.name}</option>
                      ))
                    ) : (
                      <option>landing...</option>
                    )}
                  </select>
                  <button className='addWorksSpaces' onClick={handleClick}><i className="bi bi-plus-lg"></i></button>
                </div>
                <div><i className="bi bi-three-dots" onClick={handelShowRightForm}></i></div>
              </div>


              <div className="barTable">
                <p>main table</p>
                <div className="breakLine"></div>
              </div>
              <div className="soBar">
                <button className="createBtn" onClick={handleNewTask}>New task <i className="bi bi-plus"></i></button>
                <button onClick={() => { console.log(taskDetails) }}><i className="bi bi-search"></i> search</button>
                <button><i className="bi bi-funnel"></i> filter</button>
                <button><i className="bi bi-arrow-down-up"></i> sort</button>
              </div>
            </div>
            <div className="tasksTable">
              <div className="titleTable">
                <i className="bi bi-arrow-down-short"></i>
                <h2>To-Do</h2>
              </div>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      {showForms[2] ?
                        <th id="fr-th"></th> : undefined}
                      <th style={{ width: '320px' }}>task</th>
                      <th>due date</th>
                      <th>status</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>

                    {taskDetails.map((element, index) => (


                      <tr key={index}>
                        {showForms[2] ?
                          <td className="checkBoxDel">
                            <input type="checkbox" id={`ischeck${element.id}`} onChange={(e) => {
                              e.target.checked ? setDelTasks([...delTasks, { id: element.id, title: element.title }]) : setDelTasks(
                                delTasks.filter(task => task.id !== element.id)
                              );
                            }} />
                          </td> : undefined
                        }


                        <td style={{ textAlign: 'start' }}><div><input onChange={(e) => handleUpdate(element.id, 'title', e.target.value)} type="text" value={element.title} /></div></td>
                        <td className="dueDateInput"><div><input value={element.due_date || ''} type="date" onChange={(e) => handleUpdate(element.id, 'due_date', e.target.value)} /></div></td>

                        <td id={`column${index}`} style={{
                          backgroundColor: element.status == 'Working on it' ? 'orange' : element.status == 'Done' ? 'green' : element.status == 'Stuck' ? 'red' : element.status == 'Not Started' ? '#A9A9A9' : '',
                        }}>
                          <select id="mySelect" onChange={(e) => handleStatuts(e, element.id, 'status', e.target.value, index)} value={element.status} >
                            <option id="doneInput" value="Done">Done</option>
                            <option id="workOnInput" value="Working on it" >Working on it</option>
                            <option id="stuckInput" value="Stuck">Stuck</option>
                            <option id="" value="Not Started">Not Started</option>
                          </select>
                        </td>

                        <td>
                          <div><input type="text" value={element.description || ""} onChange={(e) => handleUpdate(element.id, 'description', e.target.value)}  /></div>
                        </td>

                      </tr>

                    ))}
                    <tr className="row-newTaskInput">
                      {showForms[2] ? <td className="emptyTd"></td> : undefined}

                      <td className="newTaskInput" colSpan="4">
                        <input type="text" placeholder="+ Add task" />
                      </td>
                    </tr>

                  </tbody>
                </table>

              </div>

            </div>

          </div>

        </div>
        <div id="buttonvalid">
          <div>
            <button onClick={handleUpdateTask}><i className="bi bi-check-circle"></i></button>
            <button onClick={() => {
              window.location.reload();
            }}><i className="bi bi-x-circle-fill"></i></button>
          </div>
        </div>

      </div>
      {showForms[0] ?
        <div id="addworkspaceForm">
          <h2>new workspace</h2>
          <div className="permissionText">
            <p>you have permission only for <strong>4 workspaces</strong> !</p>
          </div>
          <div className="inputsDiv">
            <input type="text" placeholder="new workspace name" onChange={(e) => { setNewWorkspace(e.target.value) }} />
            {errorMessage !== '' ? <p className="WorkspaceErrMsg">{errorMessage}</p> : undefined}

            <button type="submit" id="createWorkspaceBtn" onClick={handleBtnaddWorkspaces}>create</button>
          </div>
        </div>
        : <></>
      }
      {showForms[1] ?
        <div className="three-dots-dev">
          <div>
            <ul>
              <li onClick={handleDelWorkspace}><i className="bi bi-folder-minus"></i><p>expair workspace</p></li>
              <li onClick={() => {
                const newShowForms = [...showForms];
                newShowForms[2] = true;
                newShowForms[1] = false;
                setShowForms(newShowForms);

              }}><i className="bi bi-trash"></i><p>delete task</p></li>
              <div className="theLine"></div>
              <li><i className="bi bi-gear"></i><p>setting</p></li>
            </ul>
          </div>
        </div>
        : <></>}

      {showForms[2] ?
        <div className="buttonvalid">
          <div>
            <button id="trash" disabled={isDisabled} onClick={handeldeltask}><i className="bi bi-trash"></i></button>
            <button onClick={() => {
              const newShowForms = [...showForms];
              newShowForms[2] = false;
              setShowForms(newShowForms);

            }}><i className="bi bi-x-circle-fill"></i></button>
          </div>
        </div> :
        <></>
      }

    </>
  );

}



