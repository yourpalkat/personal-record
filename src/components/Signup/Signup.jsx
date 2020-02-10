import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../services/tokenService';

import '../Login/Login.scss';

const Signup = ({ user, setUser, isLoggedIn }) => {

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
      setUser(token, res.data.data.user);
      setMessage(null);
    } catch (e) {
      setMessage(e);
      console.log(message);
    }
  }

  return (
    <>
    { isLoggedIn ? (
        <Redirect to = {`users/${user._id}`} />
      ) : (
        <form autoComplete='off' onSubmit={handleSubmit}>
          <h4>Please sign up to continue</h4>
          <input name='email' type='email' placeholder='email' required onChange={handleChange} />
          <label htmlFor='email'>Email address</label>
          <input name='password' type='password' placeholder='password' required onChange={handleChange} />
          <label htmlFor='password'>Password</label>
          <input name='firstName' type='text' placeholder='first name' required onChange={handleChange} />
          <label htmlFor='firstName'>First name</label>
          <input name='lastName' type='text' placeholder='last name' required onChange={handleChange} />
          <label htmlFor='lastName'>Last name</label>

          <Link className='cancel' to='/'>Cancel</Link>
          <button className='submit' type='submit' onClick={handleSubmit}>Sign up</button>
        </form>
      )}
    </>
  )
}

export default Signup;