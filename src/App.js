import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Registration from "./components/Registration";
import TodoList from "./components/TodoList";
import Axios from "axios";
import PrivateRoute from "./components/privateRoutes"; 
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); 
  const login = async (email, password) => {
    try {
      const response = await Axios.post("http://localhost:3005/login", { email, password });
      console.log(response.data);
      setUserId(response.data.user.id); 
      setLoggedIn(true); 
    } catch (error) {
      console.error("There was an error during login:", error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/registration" element={<Registration />} />
          
          <Route
            path="/todo"
            element={
              <PrivateRoute isAuthenticated={loggedIn}>
                <TodoList userId={userId} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
