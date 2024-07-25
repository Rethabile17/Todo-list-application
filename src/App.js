import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/home";
import Login from "./components/login";
import Registration from "./components/Registration";
import SearchFunction from "./components/SearchFunction"
import './App.css'



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [searchTerm,setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/SearchFunction" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




