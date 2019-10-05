import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from '../../services/tokenService';

import './Login.css';

const Signup = ({ hideLogin, setUser }) => {

  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'firstName') {
      setFirstName(e.target.value)
    } else if (e.target.name === 'lastName') {
      setLastName(e.target.value)
    }
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/users/signup`, {
        data: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        }
      });
      const token = res.data.data.token;
      setToken(token);
      setUser(token, res.data.data.user._id, res.data.data.user.firstName);
      hideLogin();
    } catch (e) {
      setMessage(e);
      console.log(message);
    }
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <h4>Please sign up to continue</h4>
      <input name='email' type='email' placeholder='email' onChange={handleChange} />
      <label htmlFor='email'>Email address</label>
      <input name='password' type='password' placeholder='password' onChange={handleChange} />
      <label htmlFor='password'>Password</label>
      <input name='firstName' type='text' placeholder='first name' onChange={handleChange} />
      <label htmlFor='firstName'>First name</label>
      <input name='lastName' type='text' placeholder='last name' onChange={handleChange} />
      <label htmlFor='lastName'>Last name</label>

      <button className='cancel' onClick={hideLogin}>cancel</button>
      <button className='submit' type='submit' onClick={handleSubmit}>Sign up</button>
    </form>
  )
}

export default Signup;