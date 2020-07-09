import React from 'react';
import styled from 'styled-components';
import { GridWrapper } from '../../elements/Layouts';
import Button from '../Button/Button';

const Header = ({isLoggedIn, firstName, logOut}) => {
  return (
    <HeaderSection>
      <GridWrapper>
        <Logo>Personal Record</Logo>
        {/* placeholder - will replace with proper logo svg once i design one */}
        <SmallLogo>PR</SmallLogo>
        <LoginDiv>
          {isLoggedIn ? (
            <p>Hello, {firstName} &emsp; <Button buttonType='button' eventHandler={logOut} text='Log out' buttonStyle='text'/></p>
          ) : (
              <p>Welcome &emsp; <Button buttonType='link' linkPath='/login' text='Log in' buttonStyle='text' /></p>
          )}
        </LoginDiv>
      </GridWrapper>
    </HeaderSection>
  );
}

export default Header;

const HeaderSection = styled.header`
  background-color: var(--color-background);
  border-bottom: 3px solid var(--color-primary);
  color: var(--color-white);
  padding: 1rem 0;
  width: 100%;
`;

const Logo = styled.h4`
  grid-column: 2 / 6;
  @media(max-width: 1024px) {
    grid-column: 2 / 4;
  }
  @media(max-width: 749px) {
    display: none;
  }
`;

const SmallLogo = styled.h4`
  display: none;
  @media(max-width: 749px) {
    display: block;
    grid-column: 2 / 3;
  }
`;

const LoginDiv = styled.div`
  grid-column: 6 / -2;
  text-align: right;
  align-self: center;
  @media(max-width: 1024px) {
    grid-column: 4 / -2;
  }
  @media(max-width: 749px) {
    grid-column: 3 / -2;
  }
`;