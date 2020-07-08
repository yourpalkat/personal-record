import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GridWrapper } from '../../elements/Layouts';
import Button from '../Button/Button';

const SectionTwo = () => {
  return (
    <SecondSection>
      <GridWrapper>
        <LeftSide>
          <h2>Welcome back</h2>
          <p>Hi! It’s nice to see you again. Want to jump right in and log your workouts? You’ll have to <Link to='/login'>Log in</Link> first.</p>
          <Button
            buttonType='link'
            buttonStyle='secondary'
            text='Log in!'
            linkPath='/login' />
        </LeftSide>
        <RightSide>
          <h2>Get started!</h2>
          <p>Ready to log your own workouts? Nice. You can create an account and <Link to='/signup'>sign up here!</Link> It’s free and only takes a second. IMPORTANT: this app is very early in development and you should not trust your data to it. It will be in a more stable place in the coming months, but for now, this is just for funsies, OK?</p>
          <Button
            buttonType='link'
            buttonStyle='secondary'
            text='Sign up!'
            linkPath='/signup' />
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

const LeftSide = styled.div`
  grid-column: 2 / 6;
  @media(min-width: 1024px) {
    grid-column: 2 / 5;
  }
  @media(min-width: 749px) {
    grid-column: 2 / -2;
    padding-bottom: 6rem;
  }
`;

const RightSide = styled.div`
  grid-column: 7 / -2;
  @median(min-width: 1024px) {
    grid-column: 6 / -2;
  }
  @median(min-width: 749px) {
    grid-column: 2 / -2;
    padding-bottom: 4rem;
  }
`;