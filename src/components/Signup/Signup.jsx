import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setRuns } from '../../redux/actions';
import { setToken } from '../../services/tokenService';

import Input from '../FormComponents/Input';
import Button from '../Button/Button';

import signupStyles from './Signup.module.scss';

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorStatus, setErrorStatus] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
  });

  const isMountedRef = useRef(null);

  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'firstName') {
      setFirstName(e.target.value)
    } else if (e.target.name === 'lastName') {
      setLastName(e.target.value)
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
    if (isMountedRef.current === true) {
      dispatch(setRuns([]));
      if (Object.values(errorStatus).indexOf(true) === -1) {
        try {
          const res = await axios.post(`/api/users/signup`, {
            data: {
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName
            }
          });
          if (isMountedRef.current) {
            const token = res.data.data.token;
            setToken(token);
            dispatch(setUser(res.data.data.user, token));
            setMessage(null);
          }
        } catch (e) {
          setMessage('That email address is taken! Please use another.');
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
    { isLoggedIn ? (
        <Redirect to = {`users/${user._id}`} />
      ) : (
        <div className='gridWrapper'>
          <form autoComplete='off' onSubmit={handleSubmit} className={signupStyles.signupForm}>
            <div className={signupStyles.headlineBlock}>
              <h2>Please create an account to continue</h2>
              <p>Fields marked with a star are required.</p>
            </div>
            <div className={signupStyles.inputBlock}>
              <Input
                inputName='email'
                inputType='email'
                inputValue={email}
                labelText='Email address:'
                inputPlaceholder='Enter email address'
                isRequired
                updateErrorStatus={updateErrorStatus}
                changeHandler={handleChange} />
            </div>

            <div className={signupStyles.inputBlock}>
              <Input
                inputName='password'
                inputType='password'
                inputValue={password}
                labelText='Password:'
                inputPlaceholder='Enter password'
                isRequired
                updateErrorStatus={updateErrorStatus}
                changeHandler={handleChange} />
            </div>

            <div className={signupStyles.inputBlock}>
              <Input
                inputName='firstName'
                inputType='text'
                inputValue={firstName}
                labelText='First name:'
                inputPlaceholder='Enter first name'
                isRequired
                updateErrorStatus={updateErrorStatus}
                changeHandler={handleChange} />
            </div>

            <div className={signupStyles.inputBlock}>
              <Input
                inputName='lastName'
                inputType='text'
                inputValue={lastName}
                labelText='Last name:'
                inputPlaceholder='Enter last name'
                isRequired
                updateErrorStatus={updateErrorStatus}
                changeHandler={handleChange} />
            </div>

            {message && <p className={signupStyles.error}>{message}</p>}

            <div className={signupStyles.buttonBlock}>
              <Button
                buttonType='link'
                linkPath='/'
                text='Cancel'
                buttonStyle='ghost' />
              <Button 
                buttonType='button' 
                eventHandler={handleSubmit}
                buttonStyle='confirm'
                text='Sign up!' />
            </div>

            <p className={signupStyles.login}>Already have an account? <Link to='/login'>Log in!</Link></p>
          </form>
        </div>
      )}
    </>
  )
}

export default Signup;