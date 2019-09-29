import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = (props) => {
  const [runs, setRuns] = useState([]);

  const fetchRuns = async () => {
    try {
      const res = await axios.get('/api/runs');
      setRuns(res.data.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchRuns();
  });

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