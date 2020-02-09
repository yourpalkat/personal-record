import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getToken } from '../../services/tokenService';
import './Dashboard.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Dashboard = ({ user, setRun, selectedRun, location }) => {
  const localizer = momentLocalizer(moment);
  const [runs, setRuns] = useState([]);

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
      setRuns(sortedRuns);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchRuns(user._id);
  }, [user._id, runs]);

  const selectRun = (run) => {
    setRun(run);
  }

  return(
    <>
      {selectedRun._id ? <Redirect to={`/users/${user._id}/runs/${selectedRun._id}`} /> : (

      <section className='dashboard'>
        <h2>
          {user.firstName}’s workouts | <Link to={`${location}/runs/add`}>Add New Run</Link>
        </h2>
        <div className='calendar-container' style={{height: 700}}>
          <Calendar 
            localizer={localizer}
            events={runs} 
            step={30} 
            defaultView='month' 
            views={['month', 'week']} 
            defaultDate={new Date()} 
            onSelectEvent={(event) => selectRun(event)}
          />
        </div>
      </section>
      )}
    </>
  );
}

export default Dashboard;