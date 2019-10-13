import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getToken } from '../../services/tokenService';
import ShowMore from '../ShowMore/ShowMore';
import AddNew from '../AddNew/AddNew';
import './Dashboard.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Dashboard = (props) => {
  const localizer = momentLocalizer(moment);
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
      <div className='calendar-container' style={{height: 700}}>
        <Calendar 
          localizer={localizer}
          events={runs} 
          step={30} 
          defaultView='month' 
          views={['month', 'week']} 
          defaultDate={new Date()} 
        />
      </div>
    </section>
  );
}

export default Dashboard;