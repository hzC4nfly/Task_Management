import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './assets/router.jsx';
import { UserProvider } from './assets/views/contexts/AuthContext';
import LoginPage from './assets/views/login/LoginPage';
import LandingPage from './assets/views/landingPage/LandingPage';
import TaskPage from './assets/views/tasksPages/TaskPage';
import Signup from './assets/views/signup/Signup';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home/task" element={<TaskPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
