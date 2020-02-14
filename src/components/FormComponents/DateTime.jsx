import React from 'react';
import DateTimePicker from 'react-datetime-picker';

import inputStyles from './Input.module.scss';

const Select = ({
  labelText,
  inputName,
  changeHandler,
  inputValue,
  }) => {

  return (
    <div className={inputStyles.inputContainer}>
      <label htmlFor={inputName}>{labelText}</label>
      <DateTimePicker 
        name={inputName} 
        id={inputName} 
        onChange={changeHandler} 
        value={inputValue} />
    </div>
  );
}

export default Select;