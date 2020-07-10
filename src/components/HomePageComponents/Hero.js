import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setRuns } from '../../redux/actions';
import { setToken } from '../../services/tokenService';
import { fetchRuns } from '../../services/fetchRuns';
import styled from 'styled-components';

import { GridWrapper } from '../../elements/Layouts';
import Button from '../Button/Button';

const Hero = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const isMountedRef = useRef(null);
  const [message, setMessage] = useState(null);

  const handleTestLogin = async e => {
    e.preventDefault();
    if (isMountedRef.current === true) {
      try {
        const res = await axios.post(`/api/users/login`, {
          data: {
            email: `test@test.com`,
            password: `test`
          }
        });
        if (isMountedRef.current) {
          const token = res.data.data.token;
          setToken(token);
          dispatch(setUser(res.data.data.user, token));
          const userRuns = await fetchRuns(res.data.data.user._id);
          dispatch(setRuns(userRuns));
          setMessage(null);
        }
      } catch (e) {
        setMessage('Error logging in as test account.')
        console.log(message, e);
      }
    }
  }

  useEffect(() => {
    // set flag that component is mounted and thus async functions can run
    isMountedRef.current = true;
    // return a function to set mounted flag to false, so async functions won't run
    return () => isMountedRef.current = false;
  }, []);

  return (
        <>
      {isLoggedIn ? (
        <Redirect to={`users/${user._id}`} />
      ) : (
        <HeroSection>
          <GridWrapper>
            <ContentBlock>
              <h1>Personal Record</h1>
              <HeroPara>Hello! Personal Record is a simple web app for logging your running workouts &ndash; just enter the date, distance and duration of your run! You can also note things like the type of workout and add comments. This is very much a work in progress, but we’ve got plans to add lots more functionality over the coming months, so check back!</HeroPara>
              <HeroPara>No sign-up needed if you just want to test-drive the app: just click this button to play with the open guest account!</HeroPara>
              <Button
                buttonType='button'
                buttonStyle='primary'
                text='Try it out!'
                eventHandler={handleTestLogin} />
            </ContentBlock>
          </GridWrapper>
        </HeroSection>
      )}
    </>
  );
};

export default Hero;

const HeroSection = styled.section`
  background-image: 
    linear-gradient(135deg, rgba(192, 38, 139, 0.8) 0%, rgba(108, 80, 216, 0.8) 55%, rgba(130, 159, 214, 0.8) 100%), 
    url('./assets/splash.jpg');
  background-position: center left;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 4rem 0;
`;

const ContentBlock = styled.div`
  grid-column: 7 / -2;
  color: var(--color-white);
  padding: 2.4rem 2.8rem 3.4rem;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.45);

  @media(max-width: 1024px) {
    grid-column: 4 / -2;
  }

  @media(max-width: 749px) {
    grid-column: 2 / -2;
  }

  h1 {
    font-size: 3.8rem;
    margin-bottom: 2rem;
  }
`;

const HeroPara = styled.p`
  font-size: 2.2rem;
  line-height: 1.6;
  letter-spacing: -0.05rem;
  margin-bottom: 2rem;

  @media(max-width: 749px) {
    font-size: 1.9rem;
  }

  &:last-of-type {
    margin-bottom: 4rem;
  }
`;