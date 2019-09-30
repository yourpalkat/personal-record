import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/tokenService';

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
    <section>
      <div>
        Hello, {userName}
        <button onClick={props.logOut}>Log out</button>
      </div>
      <div>
        {runs.map(run => {
          return (
            <div>
              <p>{run.workoutType}</p>
              <p>{run.distance}</p>
            </div>
          )
        })}
      </div>
    </section>
  );
}

export default Dashboard;