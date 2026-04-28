import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './assets/router.jsx';
import { UserProvider } from './assets/views/contexts/AuthContext';

createRoot(document.getElementById('root')).render(
   <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
   </UserProvider>
)
