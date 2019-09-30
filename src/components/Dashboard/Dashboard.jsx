import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../services/tokenService';

import './Dashboard.css';

const Dashboard = (props) => {
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
      setRuns(res.data.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchRuns(props.userId);
  }, [props.userId]);

  const userName = props.userName;
  return(
    <section className='dashboard'>
      <h2>
        {userName}’s workouts
      </h2>
      <div className='workout-grid'>
        {runs.map(run => {
          return (
            <div className='workout'>
              <p>{run.workoutType}</p>
              <p>{run.distance}km</p>
            </div>
          )
        })}
      </div>
    </section>
  );
}

export default Dashboard;