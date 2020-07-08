import styled from 'styled-components';

export const GridWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4% repeat(12, 1fr) 4%;
  grid-column-gap: 1%;

  @media(min-width: 1024px) {
    grid-template-columns: 4% repeat(8, 1fr) 4%;
    grid-column-gap: 1%;
  }
  @media(min-width: 749px) {
    grid-template-columns: 3% repeat(6, 1fr) 3%;
    grid-column-gap: 2%;
  }
`;