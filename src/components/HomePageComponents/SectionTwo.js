import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GridWrapper } from '../../elements/Layouts';
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
          <p>July 10, 2020: added ability to track more data (weather, race placement, perceived effort, rating out of five). Also! Redesigned run details screen that shows more information and looks pretty nice, too.</p>
        </RightSide>
      </GridWrapper>
    </SecondSection>
  );
};

export default SectionTwo;

const SecondSection = styled.section`
  padding: 4rem 0;
  color: var(--color-white);

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
  grid-column: 2 / -2;
  padding-bottom: 4rem;
`;

const LeftSide = styled.div`
  grid-column: 2 / 6;
  padding-inline-end: 2rem;
  @media(max-width: 1024px) {
    grid-column: 2 / 6;
  }
  @media(max-width: 749px) {
    grid-column: 2 / -2;
    padding-inline-end: 0;
    padding-bottom: 6rem;
  }
`;

const Middle = styled.div`
  grid-column: 6 / 10;
  padding-inline-end: 2 rem;
  @media(max-width: 1024px) {
    grid-column: 6 / -2;
  }
  @media(max-width: 749px) {
    grid-column: 2 / -2;
    padding-inline-end: 0;
    padding-bottom: 6rem;
  }
`;

const RightSide = styled.div`
  grid-column: 10 / -2;
  @media(max-width: 1024px) {
    padding-top: 4rem;
    grid-column: 2 / 10;
  }
  @media(max-width: 749px) {
    grid-column: 2 / -2;
    padding-bottom: 4rem;
  }
`;