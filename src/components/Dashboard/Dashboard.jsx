import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getToken } from '../../services/tokenService';

import Button from '../Button/Button';

import dashStyles from './Dashboard.module.scss';
import 'react-big-calendar/lib/sass/styles.scss';
import './CalendarEventStyles.scss';

const Dashboard = ({ user, setRun, selectedRun, location }) => {
  const localizer = momentLocalizer(moment);
  const [runs, setRuns] = useState([]);
  
  // This is a flag we'll use to make sure the component is mounted and to
  // know whether to run async cleanup functions when it's unmounted
  const isMountedRef = useRef(null);

  const fetchRuns = async (id) => {
    try {
      const res = await axios.post(`/api/runs`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        data: {
          'userId': id
        }
      });
      const sortedRuns = res.data.data;
      sortedRuns.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else {
          return -1;
        }
      });
      if (isMountedRef.current) {
        setRuns(sortedRuns);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    // set flag that component is mounted and thus async functions can run
    isMountedRef.current = true;
    if (isMountedRef.current) {
      fetchRuns(user._id);
    }
    // return a function to set mounted flag to false, so async functions won't run
    return () => isMountedRef.current = false;
  }, [user._id, runs]);

  const selectRun = (run) => {
    setRun(run);
  }

  return(
    <>
      {selectedRun._id ? <Redirect to={`/users/${user._id}/runs/${selectedRun._id}`} /> : (
        <div className='gridWrapper'>
          <section className={dashStyles.dashboard}>
            <div className={dashStyles.titleBlock}>
              <h2>{user.firstName}’s workouts &emsp;</h2>
              <Button 
                buttonType='link'
                linkPath={`${location}/runs/add`}
                buttonStyle='confirm'
                text='Add New Run' />
            </div>
            <div className={dashStyles.calendarContainer} style={{height: 700}}>
              <Calendar 
                localizer={localizer}
                events={runs} 
                step={30} 
                defaultView='month' 
                views={['month', 'week']} 
                defaultDate={new Date()} 
                onSelectEvent={(event) => selectRun(event)}
                eventPropGetter={(event) => { return { className: `${event.workoutType}Run`} }}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Dashboard;