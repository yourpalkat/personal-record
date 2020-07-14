import React, { useState, useRef, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setRuns } from '../../redux/actions';
import { setToken } from '../../services/tokenService';
import { fetchRuns } from '../../services/fetchRuns';

import { GridWrapper, SignupForm, SignupHeadlineBlock } from '../../elements/Layouts';
import { colors } from '../../elements';
import Button from '../Button/Button';
import Input from '../FormComponents/Input';

const Login = () => {
  const user = useSelector(state => state.user);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState({
    email: false,
    password: false,
  });
  const isMountedRef = useRef(null);

  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const updateErrorStatus = (key, value) => {
    setErrorStatus({
      ...errorStatus,
      [key]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if(isMountedRef.current === true) {
      dispatch(setRuns([]));
      if (Object.values(errorStatus).indexOf(true) === -1) {
        try {
          const res = await axios.post(`/api/users/login`, {
            data: {
              email: email,
              password: password
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
          setMessage('Sorry, your login or password is incorrect!');
          console.log(e);
        }
      } else {
        setMessage('Please check the form for errors and try again!');
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
        <GridWrapper>
          <SignupForm autoComplete='off' onSubmit={handleSubmit}>
            <SignupHeadlineBlock>
              <h2>Please log in to continue</h2>
              <p>Fields marked with a star are required.</p>
            </SignupHeadlineBlock>
            <InputBlock>
              <Input 
                inputName='email'
                inputType='email'
                inputValue={email}
                labelText='Email address:'
                inputPlaceholder='Enter email address'
                isRequired
                updateErrorStatus={updateErrorStatus}
                changeHandler={handleChange} />
            </InputBlock>
            <InputBlock>
              <Input 
                inputName='password'
                inputType='password'
                inputValue={password}
                labelText='Password:'
                inputPlaceholder='Enter password'
                isRequired
                updateErrorStatus={updateErrorStatus}
                changeHandler={handleChange} />
            </InputBlock>
            {message && <ErrorMessage>{message}</ErrorMessage>}
            <Button 
              buttonStyle='confirm'
              buttonType='submit' 
              eventHandler={handleSubmit}
              text='Log in' />
            <SignUp>Don't have an account? <Link to='/signup'>Sign up!</Link></SignUp>
          </SignupForm>
        </GridWrapper>
      )}
    </>
  );
}

export default Login;

const InputBlock = styled.div`
  margin-bottom: 3rem;
`;

const ErrorMessage = styled.p`
  color: ${colors.danger};
  letter-spacing: 0.05rem;
  margin-top: -2rem;
  margin-bottom: 4rem;
`;

const SignUp = styled.p`
  color: ${colors.white};
  font-size: 1.8rem;
  margin-top: 5rem;
`;