import React from 'react';
import styled from 'styled-components';
import { GridWrapper } from '../../elements/Layouts';
import { colors, breakpoints } from '../../elements';
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
  background-color: ${colors.background};
  border-bottom: 3px solid ${colors.primary};
  color: ${colors.white};
  padding: 1rem 0;
  width: 100%;
`;

const Logo = styled.h4`
  grid-column: 2 / 6;
  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 2 / 4;
  }
  @media(max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const SmallLogo = styled.h4`
  display: none;
  @media(max-width: ${breakpoints.mobile}) {
    display: block;
    grid-column: 2 / 3;
  }
`;

const LoginDiv = styled.div`
  grid-column: 6 / -2;
  text-align: right;
  align-self: center;
  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 4 / -2;
  }
  @media(max-width: ${breakpoints.mobile}) {
    grid-column: 3 / -2;
  }
`;