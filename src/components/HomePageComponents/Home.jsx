import React from 'react';
import { Link } from 'react-router-dom';

import Hero from './Hero';

import homeStyles from './Home.module.scss';

const Home = ({ setUser, user, isLoggedIn }) => (
  <>
    <div className='gridWrapper'>
      <h2 className={homeStyles.header}>Home</h2>
      <p className={homeStyles.introText}><Link to='/login'>Log in</Link></p>
      <p className={homeStyles.introText}><Link to='/signup'>Sign up!</Link></p>
    </div>
    <Hero
      setUser={setUser}
      user={user}
      isLoggedIn={isLoggedIn} />
  </>
);

export default Home;
