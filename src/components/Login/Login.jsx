import React, { useState, useRef, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../services/tokenService';

import Button from '../Button/Button';
import Input from '../FormComponents/Input';

import loginStyles from './Login.module.scss';

const Login = ({ setUser, user, isLoggedIn }) => {
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const isMountedRef = useRef(null);

  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!errorStatus) {
      try {
        const res = await axios.post(`/api/users/login`, {
          data: {
            email: email,
            password: password
          }
        });
        if (isMountedRef.current) {
          const token = res.data.data.token;
          setToken(token);
          setUser(token, res.data.data.user);
          setMessage(null);
        }
      } catch (e) {
        setMessage('Sorry, your login or password is incorrect!');
        console.log(e);
      }
    } else {
      setMessage('Please check the form for errors and try again!');
    }
  }

  useEffect(() => {
    // set flag that component is mounted and thus async functions can run
    isMountedRef.current = true;
    // return a function to set mounted flag to false, so async functions won't run
    return () => isMountedRef.current = false;
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Redirect to={`users/${user._id}`} />
      ) : (
        <div className='gridWrapper'>
          <form autoComplete='off' onSubmit={handleSubmit} className={loginStyles.loginForm}>
            <h4>Please log in to continue</h4>
            <Input 
              inputName='email'
              inputType='email'
              inputValue={email}
              labelText='Email address:'
              inputPlaceholder='Enter email address'
              isRequired
              setErrorStatus={setErrorStatus}
              changeHandler={handleChange} />
            <Input 
              inputName='password'
              inputType='password'
              inputValue={password}
              labelText='Password:'
              inputPlaceholder='Enter password'
              isRequired
              setErrorStatus={setErrorStatus}
              changeHandler={handleChange} />
            {message && <p className={loginStyles.error}>{message}</p>}
            <Button 
              buttonStyle='confirm'
              buttonType='submit' 
              eventHandler={handleSubmit}
              text='Log in' />
            <p className={loginStyles.signup}>Don't have an account? <Link to='/signup'>Sign up!</Link></p>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;