import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/home";
import Login from "./components/login";
import Registration from "./components/Registration";
import TodoList from "./components/TodoList";
import Axios from "axios";
import './App.css'



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/todo"  element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




