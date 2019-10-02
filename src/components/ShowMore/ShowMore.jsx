import React from 'react';
import Moment from 'react-moment';

import './ShowMore.css';

const ShowMore = ({ run, hideMoreInfo }) => {
  return (
    <div className='show-more-modal'>
      <div className='show-more-wrapper'>
        <div className='close-wrap'>
          <button className='close' onClick={hideMoreInfo}>Close</button>
        </div>
        <Moment date={run.date} format='Do MMMM, YYYY'/>
        <Moment date={run.date} format='h:mm:ss a' />
        <p>Distance: {run.distance}km</p>
        <p>Elapsed time: {run.elapsedTime} minutes</p>
        <p>Workout type: {run.workoutType}</p>
        <p>Notes: {run.notes}</p>
      </div>
    </div>
  );
}

export default ShowMore;