import React from 'react';
import Button from '../Button/Button';

import headerStyles from './Header.module.scss';

const Header = ({isLoggedIn, firstName, logOut}) => {
  return (
    <header>
      <div className='gridWrapper'>
        <h4 className={headerStyles.logo}>Personal Record</h4>
        <div className={headerStyles.login}>
          {isLoggedIn ? (
            <p>Hello, {firstName} &emsp; <Button buttonType='button' eventHandler={logOut} text='Log out' buttonStyle='text'/></p>
          ) : (
              <p>Welcome &emsp; <Button buttonType='link' linkPath='/login' text='Log in' buttonStyle='text' /></p>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;