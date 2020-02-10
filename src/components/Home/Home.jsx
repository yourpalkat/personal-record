import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return(
    <div>
      <h2>Home</h2>
      <p><Link to='/login'>Log in</Link></p>
      <p><Link to='/signup'>Sign up!</Link></p>
    </div>
  );
};

export default Home;