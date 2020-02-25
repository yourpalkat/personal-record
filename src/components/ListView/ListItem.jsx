import React from 'react';
import Moment from 'react-moment';

import itemStyles from './ListItem.module.scss';

const ListItem = ({ run, setRun, setNavTo }) => {
  return (
    <li className={itemStyles.listItem}>
      <p><Moment date={run.start} format='MMM D YYYY' /></p>
      <p>{run.distance}km</p>
      <p className={`${itemStyles.runType} runType${run.workoutType}`}>{run.workoutType}</p>
      <button
        className={itemStyles.viewEdit}
        type='button'
        onClick={() => {
          setRun(run);
          setNavTo('view');}}
        >
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
          <span className={itemStyles.buttonText}>View</span></button>
      <button
        className={itemStyles.viewEdit}
        type='button'
        onClick={() => {
          setRun(run);
          setNavTo('edit');
        }}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" className="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
          <span className={itemStyles.buttonText}>Edit</span></button>
    </li>
  );
};

export default ListItem;