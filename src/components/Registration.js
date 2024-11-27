import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Registration.css';
import axios from "axios";
import Swal from 'sweetalert2';


function Add(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();

  const validateForm = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (name.trim() === '') {
      setNameError('Please enter your name');
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
      axios.post('http://localhost:3005/users', {
        name: name,
        email: email,
        password: password
      }).then((res) => {
        Swal.fire({
          title: "Registration successfully!",
          text: "Welcome  user!",
          icon: "success",
         
        });
        console.log(res.data);
        navigate('/login');
      }).catch((error) => {
        Swal.fire({
          title: "Login unsuccessful!",
          text: "Check login details!",
          icon: "error",
          
        });
        console.error('There was an error!', error);
      });
    }
  };

  return (
    // <div className="mainInput">
      // <div className="titleInput">Registration</div>
      // <br />
      // <div className="input1">
      //   <input 
      //     type="text"
      //     value={name}
      //     placeholder="Enter your name here"
      //     onChange={(ev) => setName(ev.target.value)}
      //     className="inputBox2"
      //   />
      //   <label className="errorLabel">{nameError}</label>
      // </div>
      // <br />
      // <div className="input1">
      //   <input
      //     value={email}
      //     placeholder="Enter your email here"
      //     onChange={(ev) => setEmail(ev.target.value)}
      //     className="inputBox2"
      //   />
      //   <label className="errorLabel">{emailError}</label>
      // </div>
      // <br />
      // <div className="input1">
      //   <input
      //     value={password}
      //     placeholder="Enter your password here"
      //     onChange={(ev) => setPassword(ev.target.value)}
      //     type="password"
      //     className="inputBox2"
      //   />
      //   <label className="errorLabel">{passwordError}</label>
      // </div>
    //   <br />
    //   <div className="inputA">
    //     <input
    //       className="inputButton"
    //       type="button"
    //       onClick={onButtonClick}
    //       value="Submit"
    //     />
    //   </div>
    // </div>

    <div className={'mainContainer'}>
    <div className={'titleContainer'}>
      <div>Registration</div>
    </div>
    <div className={'inputContainer'}>
      <input
          type="text"
          value={name}
          placeholder="Enter your name here"
          onChange={(ev) => setName(ev.target.value)}
          className="inputBox2"
        />
        </div>
    <div className={'inputContainer'}>
      <input
        value={email}
        placeholder="Enter your email here"
        onChange={(ev) => setEmail(ev.target.value)}
        className={'inputBox'}
      />
      <label className="errorLabel">{emailError}</label>
    </div>
    <div className={'inputContainer'}>
      <input
        value={password}
        placeholder="Enter your password here"
        onChange={(ev) => setPassword(ev.target.value)}
        type="password"
        className={'inputBox'}
      />
      <label className="errorLabel">{passwordError}</label>
    </div>
    <div className={'inputContainer'}>
      <input
        className={'inputButton'}
        type="button"
        onClick={onButtonClick}
        value={'Sign Up'}
      />
    </div>
    <div className='inputContainer text'>
      Have an account? Go back to 
      <Link to="/login" className={'registerLink'}> Login.</Link>
    </div>
  </div>
  );
}

export default Add;
