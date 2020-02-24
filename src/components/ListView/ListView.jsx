import React from 'react';

import Button from '../Button/Button';

import listStyles from './ListView.module.scss';

const ListView = ({ user, userRuns, setRun, selectedRun, location }) => {
  return (
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
        {userRuns.map((run, i) => {
          return <li key={`runItem${i}`}>{run.title}</li>
        })}
      </ul>
    </section>
  );
};

export default ListView;