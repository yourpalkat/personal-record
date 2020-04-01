import React from 'react';

import checkStyles from './Checkbox.module.scss';

const Checkbox = ({ labelText, name, value, isSelected, changeHandler }) => {
  return (
    <>
      <input
          type='checkbox' 
          className={checkStyles.checkbox}
          name={name}
          id={value}
          value={value}
          checked={isSelected}
          onChange={changeHandler} />
      <label htmlFor={value} className={checkStyles.checkLabel}>
        {labelText}
      </label>
    </>
  );
}

export default Checkbox;