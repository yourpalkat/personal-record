import React from 'react';
import { Link } from 'react-router-dom';

import homeStyles from './Home.module.scss';

const Home = () => (
  <div className='gridWrapper'>
    <h2 className={homeStyles.header}>Home</h2>
    <p className={homeStyles.introText}><Link to='/login'>Log in</Link></p>
    <p className={homeStyles.introText}><Link to='/signup'>Sign up!</Link></p>
  </div>
);

export default Home;
