import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { getToken } from '../../services/tokenService';
import ShowMore from '../ShowMore/ShowMore';
import AddNew from '../AddNew/AddNew';
import './Dashboard.css';

const Dashboard = (props) => {
  const [runs, setRuns] = useState([]);
  const [selectedRun, setSelectedRun] = useState({});
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);

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
      setRuns(res.data.data.sort((a, b) => a.date - b.date ));
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchRuns(props.userId);
  }, [props.userId, runs]);

  const showMoreInfo = (run) => {
    setSelectedRun(run);
    setIsShowMoreVisible(true);
  }

  const hideMoreInfo = () => {
    setSelectedRun({});
    setIsShowMoreVisible(false);
  }

  const userName = props.userName;
  return(
    <section className='dashboard'>
      <h2>
        {userName}’s workouts | <button className='add-new-button' onClick={() => setShowAddNew(true)}>Add New Run</button>
      </h2>
      {showAddNew && <AddNew setShowAddNew={setShowAddNew} userId={props.userId} />}
      {isShowMoreVisible && <ShowMore run={selectedRun} hideMoreInfo={hideMoreInfo} />}
      <div className='workout-grid'>
        {runs.map(run => {
          return (
            <div className='workout' key={run._id}>
              <Moment date={run.date} format='Do MMMM, YYYY' />
              <p>{run.distance}km</p>
              <button className='more' onClick={() => showMoreInfo(run)}>More...</button>
            </div>
          )
        })}
      </div>
    </section>
  );
}

export default Dashboard;