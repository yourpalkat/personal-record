import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from '../services/tokenService';

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
      console.log(e);
    }
  }

  return (
    <div className="wrapper">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h4>Please sign up to continue</h4>
        <input name="email" type="email" placeholder="email" onChange={handleChange} />
        <input name="password" type="password" placeholder="password" onChange={handleChange} />
        <input name="firstName" type="text" placeholder="first name" onChange={handleChange} />
        <input name="lastName" type="text" placeholder="last name" onChange={handleChange} />

        <button type="submit" onClick={handleSubmit}>Sign up</button>
        <button onClick={hideLogin}>cancel</button>
      </form>
    </div>
  )
}

export default Signup;