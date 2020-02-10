import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../services/tokenService';

import loginStyles from './Login.module.scss';

const Login = ({ setUser, user, isLoggedIn }) => {
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/users/login`, {
        data: {
          email: email,
          password: password
        }
      });
      const token = res.data.data.token;
      setToken(token);
      setUser(token, res.data.data.user);
      setMessage(null);
    } catch (e) {
      setMessage({ message: e });
      console.log(e);
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <Redirect to={`users/${user._id}`} />
      ) : (
        <div className='gridWrapper'>
          <form autoComplete='off' onSubmit={handleSubmit} className={loginStyles.loginForm}>
            <h4>Please log in to continue</h4>
            <input name='email' type='email' placeholder='email' onChange={handleChange} required />
            <label htmlFor='email'>Email address</label>
            <input name='password' type='password' placeholder='password' onChange={handleChange} required />
            <label htmlFor='password'>Password</label>
            <button className={loginStyles.submit} type='submit' onClick={handleSubmit}>Log in</button>
            {message && <p>Sorry, your login or password was incorrect!</p>}
            <p className={loginStyles.signup}>Don't have an account? <Link to='/signup'>Sign up!</Link></p>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;