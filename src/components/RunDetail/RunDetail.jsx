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

  return (
    <>
      {!run._id ? <Redirect to={`/users/${user._id}`} /> : (
        <div className='gridWrapper'>
          {showDelete && <DeleteRun setRun={setRun} closeModal={() => setShowDelete(false)} run={displayRun} />}
          <div className={runStyles.moreInfo}>
            <div className={runStyles.closeContainer}>
              <Button 
                buttonType='button'
                buttonStyle='ghost'
                text='Close'
                eventHandler={() => setRun({})} />
            </div>
            <h5><Moment date={displayRun.start} format='Do MMMM, YYYY, h:mm a' /></h5>
            <h3>{displayRun.title}</h3>
            <p>Distance: {displayRun.distance}km</p>
            <p>Elapsed time: {displayRun.elapsedTime.format('h:mm:ss')}</p>
            <p>Workout type: {displayRun.workoutType}</p>
            <p>Notes: {displayRun.notes}</p>
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
          </div>
        </div>
      )}
    </>
  );
}

export default RunDetail;