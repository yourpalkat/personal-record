import React from 'react';

import './Login.css';

const Login = () => {
  return(
    <form className="loginForm">
      <input type="email" name="email" placeholder="Email" />
      <label htmlFor="email">Enter your email address</label>
      <input type="password" name="password" />
      <label htmlFor="password">Enter your password</label>
      <button type="submit" name="submit">Log in</button>
    </form>
  );
}

export default Login;