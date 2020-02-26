import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Button from '../Button/Button';

import dashStyles from './Dashboard.module.scss';
import 'react-big-calendar/lib/sass/styles.scss';
import './CalendarEventStyles.scss';

const Dashboard = ({ user, userRuns, setRun, selectedRun }) => {
  const localizer = momentLocalizer(moment);
  const [viewRun, setViewRun] = useState(false);

  const selectRun = (run) => {
    setRun(run);
  }

  return(
    <>
      {selectedRun._id && viewRun ? <Redirect to={`/users/${user._id}/runs/${selectedRun._id}`} /> : (
        <section className={dashStyles.dashboard}>
          <div className={dashStyles.titleBlock}>
            <h2>{user.firstName}’s workouts &emsp;</h2>
            <Button 
              buttonType='link'
              linkPath={`/users/${user._id}/runs/add`}
              buttonStyle='confirm'
              text='Add New Run' />
          </div>
          <div className={dashStyles.calendarContainer}>
            <Calendar 
              localizer={localizer}
              events={userRuns} 
              step={30} 
              defaultView='month' 
              views={['month', 'week']} 
              defaultDate={new Date()} 
              onSelectEvent={(event) => {
                selectRun(event);
                setViewRun(true);}}
              eventPropGetter={(event) => { return { className: `${event.workoutType}Run`} }}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default Dashboard;