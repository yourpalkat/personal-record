import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '../Button/Button';
import ListItem from './ListItem';

import listStyles from './ListView.module.scss';

const ListView = ({ user, userRuns, setRun, selectedRun, location }) => {
  const [navTo, setNavTo] = useState('');

  return (
    <>
      {selectedRun && navTo === 'edit' && <Redirect to={`/users/${user._id}/runs/${selectedRun._id}/edit`} />}
      {selectedRun && navTo === 'view' && <Redirect to={`/users/${user._id}/runs/${selectedRun._id}`} />}
      <section className={listStyles.listSection}>
        <div className={listStyles.titleBlock}>
          <h2>{user.firstName}’s workouts &emsp;</h2>
          <Button
            buttonType='link'
            linkPath={`${location}/runs/add`}
            buttonStyle='confirm'
            text='Add New Run' />
        </div>

        <ul className={listStyles.listBlock}>
          <div className={listStyles.listHeader}>
            <h4>Date</h4>
            <h4>Distance</h4>
            <h4>Workout</h4>
          </div>
          {userRuns.map((run, i) => <ListItem key={`runItem${i}`} run={run} setRun={setRun} user={user} setNavTo={setNavTo} />)}
        </ul>
      </section>
    </>
  );
};

export default ListView;