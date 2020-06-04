import React from 'react';

import ratingStyles from './Rating.module.scss';

const Rating = ({ number, heading, type }) => {
  let styleName = '';
  if (type === 'effort') {
    styleName = `effort${number}`;
  } else if (type === 'rating') {
    styleName = `rating${number}`;
  }
  return (
    <div className={ratingStyles.ratingContainer}>
      <h4 className={ratingStyles.heading}>{heading}</h4>
      <div className={ratingStyles.rating}>
        <p className={ratingStyles[styleName]}>{number}</p>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={ratingStyles[styleName]}>
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>
    </div>
  );
}

export default Rating;