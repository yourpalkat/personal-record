import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setRuns } from '../../redux/actions';
import { setToken } from '../../services/tokenService';
import { fetchRuns } from '../../services/fetchRuns';

import Button from '../Button/Button';

import heroStyles from './Hero.module.scss';

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
        <section className={`gridWrapper ${heroStyles.heroSection}`}>
          <div className={heroStyles.contentBlock}>
            <h1>Personal Record</h1>
            <p>Hello! Personal Record is a simple web app for logging your running workouts &ndash; just enter the date, distance and duration of your run! You can also note things like the type of workout and add comments. This is very much a work in progress, but we’ve got plans to add lots more functionality over the coming months, so check back!</p>
            <p>No sign-up needed if you just want to test-drive the app: just click this button to play with the open guest account!</p>
            <Button
              buttonType='button'
              buttonStyle='primary'
              text='Try it out!'
              eventHandler={handleTestLogin} />
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;