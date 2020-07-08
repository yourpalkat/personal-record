import React from 'react';
import styled from 'styled-components';
import { GridWrapper } from '../../elements/Layouts';

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
  color: var(--color-white);
  font-size: 1.4rem;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const FooterLeft = styled.div`
  grid-column: 2 / 8;
  @media(min-width: 1024px) {
    grid-column: 2 / 6;
  }
  @media(min-width: 749px) {
    grid-column: 2 / -2;
  }
`;

const FooterRight = styled.div`
  grid-column: 8 / -2;
  text-align: right;
  @media(min-width: 1024px) {
    grid-column: 6 / -2;
  }
  @media(min-width: 749px) {
    grid-column: 2 / -2;
    text-align: left;
  }
`;