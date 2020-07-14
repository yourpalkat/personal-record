import React from 'react';
import styled from 'styled-components';
import { GridWrapper } from '../../elements/Layouts';
import { colors, breakpoints } from '../../elements';

const Footer = () => {
  return (
    <FooterSection>
      <GridWrapper>
        <FooterLeft>
          <p>Made in Toronto by Derek Murr, <a href='https://twitter.com/derekmurr' target='_blank' rel='noopener noreferrer'>@derekmurr</a></p>
        </FooterLeft>
        <FooterRight>
          <p>&copy; 2020. Thanks for stopping by!</p>
        </FooterRight>
      </GridWrapper>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.footer`
  background-color: rgba(0, 0, 0, 0.4);
  padding: 2rem 0;
  color: ${colors.white};
  font-size: 1.4rem;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const FooterLeft = styled.div`
  grid-column: 2 / 8;
  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 2 / 6;
  }
  @media(max-width: ${breakpoints.mobile}) {
    grid-column: 2 / -2;
  }
`;

const FooterRight = styled.div`
  grid-column: 8 / -2;
  text-align: right;
  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 6 / -2;
  }
  @media(max-width: ${breakpoints.mobile}) {
    grid-column: 2 / -2;
    text-align: left;
  }
`;