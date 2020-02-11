import React from 'react';
import { Link } from 'react-router-dom';

import headerStyles from './Header.module.scss';

const Header = ({isLoggedIn, firstName, logOut}) => {
  return (
    <header>
      <div className='gridWrapper'>
        <h4 className={headerStyles.logo}>Personal Record</h4>
        <div className={headerStyles.login}>
          {isLoggedIn ? (
            <p>Hello, {firstName} | <button onClick={logOut} className={headerStyles.logOut}>Log out</button></p>
          ) : (
            <p>Welcome | <Link to="/login">Log in</Link></p>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;