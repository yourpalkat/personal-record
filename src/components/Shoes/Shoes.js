import React from 'react';
import styled from 'styled-components';
import { PageSection, TitleBlock } from '../../elements/Layouts';

const Shoes = () => {
  return (
    <PageSection>
      <TitleBlock>
        <h2>Shoes section</h2>
      </TitleBlock>
      <ShoesPara>This is a stub.</ShoesPara>
    </PageSection>
  );
};

export default Shoes;

const ShoesPara = styled.p`
  font-size: 2.2rem;
  line-height: 1.6;
  letter-spacing: -0.05rem;
  margin-bottom: 2.6rem;
`;