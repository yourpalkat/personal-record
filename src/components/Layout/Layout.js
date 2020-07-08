import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions';
import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  const user = useSelector(state => state.user);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  }

  return (
    <Wrapper>
      <Header 
        logOut={handleLogout} 
        isLoggedIn={isLoggedIn} 
        firstName={user.firstName} />
      <main role='main' id='main'>
        {children}
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;