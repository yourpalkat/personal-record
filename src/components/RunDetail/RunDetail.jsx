import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

import Button from '../Button/Button';
import DeleteRun from '../DeleteRun/DeleteRun';

import runStyles from './RunDetail.module.scss';

const RunDetail = ({ user, run, setRun, removeRunFromState }) => {
  const [showDelete, setShowDelete] = useState(false);
  const isMountedRef = useRef(null);

  const showDeleteModal = (show) => {
    if (isMountedRef.current) {
      setShowDelete(show);
    }
  }

  useEffect(() => {
    // set flag that component is mounted and thus async functions can run
    isMountedRef.current = true;
    // return a function to set mounted flag to false, so async functions won't run
    return () => isMountedRef.current = false;
  }, []);

  const displayRun = run;
  let start = new moment(displayRun.start);
  let end = new moment(displayRun.end);
  displayRun.elapsedTime = moment.duration(end.diff(start));
  const seconds = moment.duration(end.diff(start)).as('seconds');
  const pace = seconds / displayRun.distance;
  const paceMinutes = Math.floor(pace / 60);
  const paceSeconds = Math.round(pace % 60);

  return (
    <>
      {!run._id ? <Redirect to={`/users/${user._id}`} /> : (
        <>
          {showDelete && <DeleteRun setRun={setRun} closeModal={() => showDeleteModal(false)} run={displayRun} removeRunFromState={removeRunFromState} />}
          <section className={runStyles.runDetailSection}>
            <div className={runStyles.closeContainer}>
              <button 
                type='button'
                className={runStyles.closeButton}
                aria-label='Close this view'
                onClick={() => setRun({})}>
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="window-close" className="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path></svg>
                </button>
            </div>
            <h2>{displayRun.title}</h2>
            <h3><Moment date={displayRun.start} format='Do MMMM, YYYY, h:mm a' /></h3>
            <p>Distance: {displayRun.distance}km</p>
            <p>Elapsed time: {displayRun.elapsedTime.format('h:mm:ss')}</p>
            <p>Pace: {paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds}/km</p>
            <p>Workout type: {displayRun.workoutType}</p>
            {displayRun.notes && <p>Notes: {displayRun.notes}</p>}
            <div className={runStyles.buttonContainer}>
              <Button
                buttonType='button'
                buttonStyle='danger'
                text='Delete run'
                eventHandler={() => showDeleteModal(true)} />
              <Button 
                buttonType='link'
                buttonStyle='confirm'
                text='Edit run'
                linkPath={`/users/${user._id}/runs/${run._id}/edit`} />
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default RunDetail;