import {
  createBrowserRouter
} from "react-router-dom"
import LandingPage from "./views/landingPage/landingpage.jsx";
import LoginPage from "./views/login/LoginPage.jsx";
import Signup from "./views/signup/Signup.jsx";
import TaskPage from "./views/tasksPages/TaskPage.jsx";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <LandingPage />
    },
    {
        path: "/home/task",
        element: <TaskPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/",
        element: <LoginPage />
    }
])
export default router;