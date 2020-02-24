import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import layoutStyles from './Layout.module.scss';

const Layout = ({ children, logOut, isLoggedIn, user }) => {
  return (
    <div className={layoutStyles.wrapper}>
      <Header 
        logOut={logOut} 
        isLoggedIn={isLoggedIn} 
        firstName={user.firstName} />
      <main role='main' id='main'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;