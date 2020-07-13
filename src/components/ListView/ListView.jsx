import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

import Button from '../Button/Button';
import ListItem from './ListItem';

import listStyles from './ListView.module.scss';

const ListView = () => {
  const user = useSelector(state => state.user);
  const userRuns = useSelector(state => state.userRuns);
  const selectedRun = useSelector(state => state.selectedRun);

  const [navTo, setNavTo] = useState('');
  const [sortedBy, setSortedBy] = useState('dateDesc');
  const [displayRuns, setDisplayRuns] = useState([]);

  const byDateDesc = (a, b) => moment(b.start).unix() - moment(a.start).unix();
  const byDateAsc = (a, b) => moment(a.start).unix() - moment(b.start).unix();
  const byDistDesc = (a, b) => b.distance - a.distance;
  const byDistAsc = (a, b) => a.distance - b.distance;
  const byTypeDesc = (a, b) => b.workoutType < a.workoutType;
  const byTypeAsc = (a, b) => a.workoutType < b.workoutType;

  useEffect(() => {
    const sortedRuns = userRuns.sort(byDateDesc);
    setDisplayRuns(sortedRuns);
  }, [userRuns]);

  const sortRuns = (howToSort) => {
    if (howToSort === 'date') {
      if (sortedBy === 'dateDesc') {
        const newSort = displayRuns.sort(byDateAsc);
        setDisplayRuns(newSort);
        setSortedBy('dateAsc');
      } else {
        const newSort = displayRuns.sort(byDateDesc);
        setDisplayRuns(newSort);
        setSortedBy('dateDesc');
      }
    } else if (howToSort === 'dist') {
      if (sortedBy === 'distDesc') {
        const newSort = displayRuns.sort(byDistAsc);
        setDisplayRuns(newSort);
        setSortedBy('distAsc');
      } else {
        const newSort = displayRuns.sort(byDistDesc);
        setDisplayRuns(newSort);
        setSortedBy('distDesc');
      }
    } else if (howToSort === 'type') {
      if (sortedBy === 'typeDesc') {
        const newSort = displayRuns.sort(byTypeAsc);
        setDisplayRuns(newSort);
        setSortedBy('typeAsc');
      } else {
        const newSort = displayRuns.sort(byTypeDesc);
        setDisplayRuns(newSort);
        setSortedBy('typeDesc');
      }
    }
  }

  return (
    <>
      {selectedRun && navTo === 'edit' && <Redirect to={`/users/${user._id}/runs/${selectedRun._id}/edit`} />}
      {selectedRun && navTo === 'view' && <Redirect to={`/users/${user._id}/runs/${selectedRun._id}`} />}
      <section className={listStyles.listSection}>
        <div className={listStyles.titleBlock}>
          <h2>{user.firstName}’s workouts &emsp;</h2>
          <Button
            buttonType='link'
            linkPath={`/users/${user._id}/runs/add`}
            buttonStyle='confirm'
            text='Add New Run' />
        </div>

        <ul className={listStyles.listBlock}>
          <div className={listStyles.listHeader}>
            <button 
              className={`${listStyles.headerButton} ${sortedBy === 'dateAsc' ? listStyles.activeUp : null}  ${sortedBy === 'dateDesc' ? listStyles.activeDown : null}`} 
              type='button' 
              onClick={() => sortRuns('date')}><h4>Date</h4></button>
            <button
              className={`${listStyles.headerButton} ${sortedBy === 'distAsc' ? listStyles.activeUp : null}  ${sortedBy === 'distDesc' ? listStyles.activeDown : null}`}
              type='button'
              onClick={() => sortRuns('dist')}><h4>Dist</h4></button>
            <button
              className={`${listStyles.headerButton} ${sortedBy === 'typeAsc' ? listStyles.activeUp : null}  ${sortedBy === 'typeDesc' ? listStyles.activeDown : null}`}
              type='button'
              onClick={() => sortRuns('type')}><h4>Type</h4></button>
            <p className={listStyles.headerTotals}>Runs 1&ndash;{displayRuns.length} of {displayRuns.length}</p>
          </div>
          {displayRuns.map((run, i) => <ListItem key={`runItem${i}`} run={run} user={user} setNavTo={setNavTo} />)}
        </ul>
      </section>
    </>
  );
};

export default ListView;