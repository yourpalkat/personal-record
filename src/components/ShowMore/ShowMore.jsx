import React, { useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import Delete from '../Delete/Delete';
import EditRun from '../EditRun/EditRun';
import './ShowMore.css';

const ShowMore = ({ run, hideMoreInfo }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const finishDelete = () => {
    setIsDeleted(true);
  }

  const displayRun = run;

  const updateDisplay = (newRun) => {
    displayRun.date = newRun.start;
    displayRun.distance = newRun.distance;
    const start = new moment(newRun.start);
    var end = new moment(newRun.end);
    displayRun.elapsedTime = moment.duration(start.diff(end));
    displayRun.workoutType = newRun.workoutType;
    displayRun.notes = newRun.notes;
  }

  return (
    <>
      {showEdit ? (
        <EditRun setShowEdit={setShowEdit} run={displayRun} updateDisplay={updateDisplay} />
      ) : (
        <div className='show-more-modal'>
          {showDelete ? (
            <Delete finishDelete={finishDelete} cancel={() => setShowDelete(false)} run={displayRun} />
          ) : (
            <div className='show-more-wrapper'>
              {!isDeleted ? (
                <>
                  <div className='close-wrap'>
                    <button className='close' onClick={hideMoreInfo}>Close</button>
                  </div>
                  <Moment date={displayRun.date} format='Do MMMM, YYYY'/>
                  <Moment date={displayRun.date} format='h:mm:ss a' />
                  <p>Distance: {displayRun.distance}km</p>
                  <p>Elapsed time:</p>
                  <Moment duration={displayRun.elapsedTime} date={displayRun.date} />
                  <p>Workout type: {displayRun.workoutType}</p>
                  <p>Notes: {displayRun.notes}</p>
                  <div>
                    <button className='cancel' onClick={() => setShowDelete(true)}>Delete run</button>
                    <button className='cancel' onClick={() => setShowEdit(true)}>Edit run</button>
                  </div>
                </>
              ) : (
                <>
                  <p>Run deleted.</p>
                  <div className='close-wrap'>
                    <button className='close' onClick={hideMoreInfo}>Close</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ShowMore;