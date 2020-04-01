import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { AiOutlineCloseSquare } from 'react-icons/ai';

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
                <AiOutlineCloseSquare />
              </button>
            </div>
            <h2>{displayRun.title}</h2>
            <h3><Moment date={displayRun.start} format='Do MMMM, YYYY, h:mm a' /></h3>
            <p>Distance: {displayRun.distance}km</p>
            <p>Elapsed time: {displayRun.elapsedTime.format('h:mm:ss')}</p>
            <p>Pace: {paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds}/km</p>
            <p>Workout type: {displayRun.workoutType}</p>
            {displayRun.workoutType === 'Race' && (
              <div>
                {displayRun.racePosition && (
                  <p>Race finish position: {displayRun.racePosition} {displayRun.raceFieldSize && ( 
                      <span>out of {displayRun.raceFieldSize}</span>
                    )}</p>
                )}
                {displayRun.raceAgePosition && (
                  <p>Age Group position: {displayRun.raceAgePosition} {displayRun.raceAgeFieldSize && (
                    <span>out of {displayRun.raceAgeFieldSize}</span>
                  )}</p>
                )}
              </div>
            )}
            {displayRun.treadmill && <p>Treadmill run</p>}
            {displayRun.tempInC && (
              <p>Temperature: {displayRun.tempInC}°C</p>
            )}
            {displayRun.weather.length > 0 && (
              <ul className={runStyles.weatherList}>
              <li>Conditions:</li>
                {displayRun.weather.map(condition => <li key={`weather-${condition}`}>{condition}</li>)}
              </ul>
            )}
            {displayRun.effort && (
              <p>Effort level: {displayRun.effort} / 5</p>
            )}
            {displayRun.rating && (
              <p>Rating: {displayRun.rating} / 5</p>
            )}
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