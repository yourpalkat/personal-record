import React, { useState } from 'react';

import inputStyles from './Input.module.scss';

const Select = ({
  labelText,
  inputName,
  changeHandler,
  inputValue,
  isRequired,
  optionsArray, 
  updateErrorStatus }) => {
  const [errorText, setErrorText] = useState('');

  const validate = (e) => {
    updateErrorStatus(e.target.name, false);
    setErrorText('');

    if (isRequired && inputValue === '') {
      setErrorText('This field is required!');
      updateErrorStatus(e.target.name, true);
    }
  }

  return (
    <div className={inputStyles.inputContainer}>
      <label htmlFor={inputName}>{labelText}</label>
      <select
        name={inputName}
        id={inputName}
        value={inputValue}
        className={errorText && inputStyles.error}
        onChange={changeHandler}
        onBlur={validate} >
        {optionsArray.map((option, i) => <option value={option} key={i} className={inputStyles.option}>{option}</option>)}
      </select>
      <p className={inputStyles.errorText}>{errorText ? errorText : `${' '}`}</p>
    </div>
  );
}

export default Select;