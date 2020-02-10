import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = ({isLoggedIn, firstName, logOut}) => {
  return (
    <header>
      <div className='header-wrapper'>
        <p>
          It's a website
        </p>
        {isLoggedIn ? (
          <p>Hello, {firstName} | <button className='login' onClick={logOut}>Log out</button></p>
        ) : (
            <p><Link to="/login" className='login'>Log in</Link></p>
        )}
      </div>
    </header>
  );
}

export default Header;