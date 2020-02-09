import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import Delete from '../Delete/Delete';
import './ShowMore.css';

const ShowMore = ({ user, run, setRun }) => {
  const [showDelete, setShowDelete] = useState(false);

  const displayRun = run;
  let start = new moment(displayRun.start);
  let end = new moment(displayRun.end);
  displayRun.elapsedTime = moment.duration(end.diff(start));


  const updateDisplay = (newRun) => {
    displayRun.start = newRun.start;
    displayRun.distance = newRun.distance;
    displayRun.end = newRun.end;
    start = new moment(newRun.start);
    end = new moment(newRun.end);
    displayRun.elapsedTime = moment.duration(end.diff(start));
    displayRun.workoutType = newRun.workoutType;
    displayRun.notes = newRun.notes;
  }

  return (
    <>
      {!run._id ? <Redirect to={`/users/${user._id}`} /> : (
        <>
          {showDelete && <Delete setRun={setRun} cancel={() => setShowDelete(false)} run={displayRun} />}
          <div className='show-more-wrapper'>
            <div className='close-wrap'>
              <button onClick={() => setRun({})}>Close</button>
            </div>
            <Moment date={displayRun.start} format='Do MMMM, YYYY, h:mm a'/>
            <p>Distance: {displayRun.distance}km</p>
            <p>Elapsed time: {displayRun.elapsedTime.format('h:mm:ss')}</p>
            <p>Workout type: {displayRun.workoutType}</p>
            <p>Notes: {displayRun.notes}</p>
            <div>
              <button className='cancel' onClick={() => setShowDelete(true)}>Delete run</button>
              <Link to={`users/${user._id}/runs/${run._id}/edit`}>Edit run</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ShowMore;