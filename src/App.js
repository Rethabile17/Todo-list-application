import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/home";
import Login from "./components/login";
import Registration from "./components/Registration";
import TodoList from "./components/TodoList";
import Axios from "axios";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
   // Store user ID after login

  const login = async (email, password) => {
    try {
      const response = await Axios.post('http://localhost:3005/login', { email, password });
      console.log(response.data);
      setUserId(response.data.user.id); // Adjust based on your API response structure
      setLoggedIn(true); // Set logged-in state to true
    } catch (error) {
      console.error('There was an error during login:', error);
      // Optionally, handle error feedback to the user here
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/todo" element={<TodoList userId={userId} />} /> {/* Pass userId to TodoList */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
