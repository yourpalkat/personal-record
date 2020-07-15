import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GridWrapper } from '../../elements/Layouts';
import { colors, breakpoints } from '../../elements';
import Button from '../Button/Button';

const SectionTwo = () => {
  return (
    <SecondSection>
      <GridWrapper>
        <Alert>
          <p>IMPORTANT NOTE: this app is very early in development and you should not trust your data to it. It will be in a more stable place in the coming months, but for now, this is just for funsies, OK?</p>
        </Alert>
        <LeftSide>
          <h2>Welcome back</h2>
          <p>Hello again! Want to jump right in and log your workouts? You’ll have to <Link to='/login'>Log in</Link> first.</p>
          <Button
            buttonType='link'
            buttonStyle='secondary'
            text='Log in!'
            linkPath='/login' />
        </LeftSide>
        <Middle>
          <h2>Get Started!</h2>
          <p>You can create an account and <Link to='/signup'>sign up here!</Link> It’s free and only takes a second. </p>
          <Button
            buttonType='link'
            buttonStyle='secondary'
            text='Sign up!'
            linkPath='/signup' />
        </Middle>
        <RightSide>
          <h2>What’s new?</h2>
          <p>July 14, 2020: new 'dashboard' page showing a graph of your mileage over the last two weeks; also, you can enter planned future runs! July 10, 2020: new data types added and redesigned run details page.</p>
        </RightSide>
      </GridWrapper>
    </SecondSection>
  );
};

export default SectionTwo;

const SecondSection = styled.section`
  padding: 4rem 0;
  color: ${colors.white};

  p {
    font-size: 1.85rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  p:last-of-type {
    margin-bottom: 4rem;
  }
`;

const Alert = styled.div`
  grid-column: 4 / 12;
  padding-bottom: 2rem;
  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 2 / -2;
  }
`;

const LeftSide = styled.div`
  grid-column: 2 / 6;
  padding-inline-end: 2rem;
  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 2 / 6;
  }
  @media(max-width: ${breakpoints.mobile}) {
    grid-column: 2 / -2;
    padding-inline-end: 0;
    padding-bottom: 6rem;
  }
`;

const Middle = styled.div`
  grid-column: 6 / 10;
  padding-inline-end: 2rem;
  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 6 / -2;
  }
  @media(max-width: ${breakpoints.mobile}) {
    grid-column: 2 / -2;
    padding-inline-end: 0;
    padding-bottom: 6rem;
  }
`;

const RightSide = styled.div`
  grid-column: 10 / -2;
  @media(max-width: ${breakpoints.tablet}) {
    padding-top: 4rem;
    grid-column: 2 / 10;
  }
  @media(max-width: ${breakpoints.mobile}) {
    grid-column: 2 / -2;
    padding-bottom: 4rem;
  }
`;