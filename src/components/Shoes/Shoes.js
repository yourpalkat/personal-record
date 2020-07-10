import React from 'react';
import styled from 'styled-components';

const Shoes = () => {
  return (
    <ShoesSection>
      <h2>Shoes section</h2>
      <p>This is a stub.</p>
    </ShoesSection>
  );
};

export default Shoes;

const ShoesSection = styled.section`
  grid-column: 2 / -2;
  color: var(--color-white);
  padding: 4rem 0;

  h2 {
    border-bottom: 2px solid var(--color-primary);
    margin-bottom: 4rem;
  }

  p {
    font-size: 2.2rem;
    line-height: 1.6;
    letter-spacing: -0.05rem;
    margin-bottom: 2.6rem;
  }
`;