import React, { useState } from 'react';
import Moment from 'react-moment';
import Delete from '../Delete/Delete';
import './ShowMore.css';

const ShowMore = ({ run, hideMoreInfo }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className='show-more-modal'>
      {showDelete ? (
        <Delete hideMoreInfo={hideMoreInfo} cancel={() => setShowDelete(false)} />
      ) : (
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
          <div>
            <button className='cancel' onClick={() => setShowDelete(true)}>Delete run</button>
            <button className='cancel' onClick={() => setShowEdit(true)}>Edit run</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowMore;