import React, { useState } from 'react';

import inputStyles from './Input.module.scss';

const Input = ({ 
  labelText, 
  inputName, 
  inputType, 
  min, 
  max, 
  changeHandler, 
  inputValue, 
  inputPlaceholder, 
  isRequired,
  updateErrorStatus }) => {
  const [errorText, setErrorText] = useState('');

  const validate = (e) => {
    updateErrorStatus(e.target.name, false);
    setErrorText('');

    if (isRequired && inputValue === '') {
      setErrorText('This field is required!');
      updateErrorStatus(e.target.name, true);
    } else if (inputType === 'email' && inputValue) {
      // eslint-disable-next-line no-useless-escape
      const regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
      if (!regex.test(inputValue)) {
        setErrorText('Please use a valid email address.');
        updateErrorStatus(e.target.name, true);
      }
    } else if (inputValue && min && inputValue < min) {
      setErrorText(`Must be greater than ${min}`);
      updateErrorStatus(e.target.name, true);
    } else if (inputValue && min && inputValue > max) {
      setErrorText(`Must be less than ${max}`);
      updateErrorStatus(e.target.name, true);
    }
  }

  return (
    <div className={inputStyles.inputContainer}>
      <label htmlFor={inputName} className={isRequired ? inputStyles.required : null}>{labelText}</label>
      <input 
        name={inputName} 
        id={inputName} 
        type={inputType} 
        value={inputValue} 
        placeholder={inputPlaceholder}
        className={errorText && inputStyles.error}
        onChange={changeHandler}
        onBlur={validate} />
      <p className={inputStyles.errorText}>{errorText ? errorText : `${' '}`}</p>
    </div>
  );
}

export default Input;