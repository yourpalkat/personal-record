import React, { useState } from 'react';

import inputStyles from './Input.module.scss';

const Textarea = ({
  labelText,
  inputName,
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
    }
  }

  return (
    <div className={inputStyles.inputContainer}>
      <label htmlFor={inputName}>{labelText}</label>
      <textarea
        name={inputName}
        id={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        className={errorText && inputStyles.error}
        onChange={changeHandler}
        onBlur={validate} />
      <p className={inputStyles.errorText}>{errorText ? errorText : `${' '}`}</p>
    </div>
  );
}

export default Textarea;