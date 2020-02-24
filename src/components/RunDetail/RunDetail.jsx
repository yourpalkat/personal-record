import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

import Button from '../Button/Button';
import DeleteRun from '../DeleteRun/DeleteRun';

import runStyles from './RunDetail.module.scss';

const RunDetail = ({ user, run, setRun }) => {
  const [showDelete, setShowDelete] = useState(false);

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
          {showDelete && <DeleteRun setRun={setRun} closeModal={() => setShowDelete(false)} run={displayRun} />}
          <section className={runStyles.runDetailSection}>
            <div className={runStyles.closeContainer}>
              <Button 
                buttonType='button'
                buttonStyle='ghost'
                text='Close'
                eventHandler={() => setRun({})} />
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
                eventHandler={() => setShowDelete(true)} />
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