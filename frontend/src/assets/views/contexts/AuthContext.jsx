

import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [task_group, setTask_group] = useState([]);

    // 🔥 Restore user if token exists
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/home", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
          if (res.data.task_group) {
            setTask_group(res.data.task_group);
          } 
        })
        .catch(() => {
          // invalid token → clear
          setUser(null);
          setToken(null);
          localStorage.removeItem("token"); 
        });
    }
   
  }, [token]);


  const login = (userData, userToken, tasks) => {
    setUser(userData);
    setToken(userToken);
    setTask_group(tasks);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setTask_group([]);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, task_group, setToken, setTask_group, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);