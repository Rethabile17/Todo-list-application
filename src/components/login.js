import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate();

  const validateForm = () => {
    setEmailError('');
    setPasswordError('');

    let isValid = true;

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

  const onButtonClick = async () => {
    if (validateForm()) {
      setIsSubmitting(true); 
      try {
        await onLogin(email, password); 
        Swal.fire({
          title: 'Login successfully!',
          text: 'Welcome back user!',
          icon: 'success',
          confirmButtonText: 'Proceed',
        });
        navigate('/todo');
      } catch (error) {
        Swal.fire({
          title: 'Login unsuccessful!',
          text: error.response?.data?.message || 'Check login details!',
          icon: 'error',
          confirmButtonText: 'Try again',
        });
        console.error('Login failed:', error);
      } finally {
        setIsSubmitting(false); 
      }
    }
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={`inputBox ${emailError ? 'errorBorder' : ''}`}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          className={`inputBox ${passwordError ? 'errorBorder' : ''}`}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <div className={'inputContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={'Log in'}
          disabled={isSubmitting} 
        />
      </div>
      <div className="inputContainer text">
        Don't have an account?{' '}
        <Link to="/registration" className={'registerLink'}>
          Register here.
        </Link>
      </div>
    </div>
  );
};

export default Login;
