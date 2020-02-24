import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

import sectionStyles from './SectionTwo.module.scss';

const SectionTwo = () => {
  return (
    <section className={`gridWrapper ${sectionStyles.sectionTwo}`}>
      <div className={sectionStyles.left}>
        <h2>Welcome back</h2>
        <p>Hi! It’s nice to see you again. Want to jump right in and log your workouts? You’ll have to <Link to='/login'>Log in</Link> first.</p>
        <Button
          buttonType='link'
          buttonStyle='secondary'
          text='Log in!'
          linkPath='/login' />
      </div>
      <div className={sectionStyles.right}>
        <h2>Get started!</h2>
        <p>Ready to log your own workouts? Nice. You can create an account and <Link to='/signup'>sign up here!</Link> It’s free and only takes a second. IMPORTANT: this app is very early in development and you should not trust your data to it. It will be in a more stable place in the coming months, but for now, this is just for funsies, OK?</p>
        <Button
          buttonType='link'
          buttonStyle='secondary'
          text='Sign up!'
          linkPath='/signup' />
      </div>
    </section>
  );
};

export default SectionTwo;