import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import layoutStyles from './Layout.module.scss';

const Layout = ({ children }) => {
  const user = useSelector(state => state.user);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  }

  return (
    <div className={layoutStyles.wrapper}>
      <Header 
        logOut={handleLogout} 
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