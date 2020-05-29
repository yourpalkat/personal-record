import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { AiOutlineCloseSquare, AiOutlineCalendar } from 'react-icons/ai';


import Button from '../Button/Button';
import Rating from './Rating';
import DeleteRun from '../DeleteRun/DeleteRun';
import WeatherConditions from './WeatherConditions';
import RunTypeIndicator from './RunTypeIndicator';

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

  let displayDistance = displayRun.distance;
  if (displayDistance && !displayDistance.toString().includes('.')) displayDistance = displayDistance + '.0';

  return (
    <>
      {!run._id ? <Redirect to={`/users/${user._id}`} /> : (
        <>
          {showDelete && <DeleteRun setRun={setRun} closeModal={() => showDeleteModal(false)} run={displayRun} removeRunFromState={removeRunFromState} />}
          <section className={runStyles.runDetailSection}>
            <h2>{displayRun.title}</h2>
            <div className={runStyles.closeContainer}>
              <button 
                type='button'
                className={runStyles.closeButton}
                aria-label='Close this view'
                onClick={() => setRun({})}>
                <AiOutlineCloseSquare />
              </button>
            </div>

            <div className={runStyles.dateContainer}>
              <AiOutlineCalendar />
              <h3><Moment date={displayRun.start} format='D MMMM YYYY, h:mm a' /></h3>
            </div>

            <div className={runStyles.weatherContainer}>
              {displayRun.tempInC && (
                <p>{displayRun.tempInC}°C</p>
              )}
              {displayRun.weather.length > 0 && (
                <ul className={runStyles.weatherList}>
                  {displayRun.weather.map(condition => <li key={`weather-${condition}`} title={condition}><WeatherConditions weatherCondition={condition} /></li>)}
                </ul>
              )}
            </div>

            <div>
              <h4 className={runStyles.heading}>Distance:</h4>
              <p className={runStyles.bigNumbers}>{displayDistance}</p>
              <p className={runStyles.units}>km</p>
            </div>

            <div>
              <h4 className={runStyles.heading}>Duration:</h4>
              <p className={runStyles.bigNumbers}>{displayRun.elapsedTime.format('h:mm:ss')}</p>
              <p className={runStyles.units}>hh:mm:ss</p>
            </div>

            <div>
              <h4 className={runStyles.heading}>Pace:</h4>
              <p className={runStyles.bigNumbers}>{paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds}</p>
              <p className={runStyles.units}>min/km</p>
            </div>

            <div>
              <h4 className={runStyles.heading}>Workout type:</h4>
              <RunTypeIndicator runType={displayRun.workoutType} />
            </div>

            {displayRun.workoutType === 'Race' && (
              <div className={runStyles.raceInfoContainer}>
                {displayRun.racePosition && (
                  <div>
                    <h4 className={runStyles.heading}>Position:</h4>
                    <p className={runStyles.bigNumbers}>{displayRun.racePosition}</p>
                    {displayRun.raceFieldSize && <p className={runStyles.units}>out of {displayRun.raceFieldSize}</p>}
                  </div>

                )}
                {displayRun.raceAgePosition && (
                  <div>
                    <h4 className={runStyles.heading}>Age group:</h4>
                    <p className={runStyles.bigNumbers}>{displayRun.raceAgePosition}</p>
                    {displayRun.raceAgeFieldSize && <p className={runStyles.units}>out of {displayRun.raceAgeFieldSize}</p>}
                  </div>
                )}
              </div>
            )}

            {displayRun.treadmill && <p>Treadmill run</p>}

            {displayRun.effort && (
              <Rating number={displayRun.effort} heading='effort' type='effort' />
            )}
            {displayRun.rating && (
              <Rating number={displayRun.rating} heading='rating' type='rating' />
            )}
            {displayRun.notes && (
              <div className={runStyles.notesContainer}>
                <h4 className={runStyles.heading}>Notes:</h4>
                <p>{displayRun.notes}</p>
              </div>
            )}
            <div className={runStyles.editDeleteContainer}>
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