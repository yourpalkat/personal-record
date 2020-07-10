import styled from 'styled-components';

export const RunDetailSubhead = styled.h4`
  font-family: var(--font-condensed);
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.4rem;
  margin-bottom: 1.4rem;
`;

export const BigNumbers = styled.p`
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 6rem;
  letter-spacing: 1px;
  margin-top: -0.8rem;
  margin-bottom: 0;

  @media(max-width: 749px) {
    font-size: 4.2rem;
  }
`;

export const Units = styled.p`
  font-size: 1.6rem;
  font-weight: 100;
  margin-top: -0.4rem;
`;