import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import React from 'react';
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
