import styled from 'styled-components';
import { colors, breakpoints } from './index';

export const GridWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4% repeat(12, 1fr) 4%;
  grid-column-gap: 1%;

  @media(max-width: ${breakpoints.tablet}) {
    grid-template-columns: 4% repeat(8, 1fr) 4%;
    grid-column-gap: 1%;
  }

  @media(max-width: ${breakpoints.mobile}) {
    grid-template-columns: 3% repeat(6, 1fr) 3%;
    grid-column-gap: 2%;
  }
`;

export const PageSection = styled.section`
  grid-column: 2 / -2;
  padding: 4rem 0;
  color: ${colors.white};
`;

export const TitleBlock = styled.div`
  margin-bottom: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.primary};

  h2 {
    margin-right: 4rem;
  }
`;

export const SignupForm = styled.form`
  grid-column: 2 / -2;
  width: 100%;
  max-width: 450px;
  margin: 0 auto 0;
  padding: 4rem 0;
`;

export const SignupHeadlineBlock = styled.div`
  color: ${colors.white};
  margin-bottom: 4rem;

  p {
    font-size: 1.8rem;
  }
`;