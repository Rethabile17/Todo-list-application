import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Registration.css'



function Add(props) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();

  const validateForm = () => {
    setUserNameError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (userName.trim() === '') {
      setUserNameError('Please enter your username');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      isValid = false;
    }

    return isValid;
  };

  const onButtonClick = () => {
    if (validateForm()) {
      
      navigate('/');
    }
  };

  return (
    <div  className="mainInput">
      <div className="titleInput">Registration</div>
      <br />
      <div className="input1">
        <input 
          type="text"
          value={userName}
          placeholder="Enter your username here"
          onChange={(ev) => setUserName(ev.target.value)}
          className="inputBox2"
        />
        <label className="errorLabel">{userNameError}</label>
      </div>
      <br />
      <div className="input1">
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className="inputBox2"
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className="input1">
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          className="inputBox2"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputA">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value="Submit"
        />
      </div>
    </div>
  );
}

export default Add;
