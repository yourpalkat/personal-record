import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../services/tokenService';

import Button from '../Button/Button';

import heroStyles from './Hero.module.scss';

const Hero = ({ setUser, user, isLoggedIn }) => {
  const isMountedRef = useRef(null);
  const [message, setMessage] = useState(null);

  const handleTestLogin = async e => {
    e.preventDefault();
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
        setUser(token, res.data.data.user);
        setMessage(null);
      }
    } catch (e) {
      setMessage('Error logging in as test account.')
      console.log(message, e);
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
            <h1>Hello.</h1>
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