import React from 'react';
import Header from '../Header/Header';

import layoutStyles from './Layout.css';

const Layout = ({ children, logOut, isLoggedIn, firstName }) => {
  return (
    <div className={layoutStyles.wrapper}>
      <Header 
        logOut={logOut} 
        isLoggedIn={isLoggedIn} 
        firstName={firstName} />
      <main role='main' id='main'>
        {children}
      </main>
    </div>
  );
};

export default Layout;