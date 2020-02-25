import React from 'react';
import { Route, Switch, NavLink, useRouteMatch } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import ListView from '../ListView/ListView';
import Profile from '../Profile/Profile';
import Shoes from '../Shoes/Shoes';
import AddNew from '../AddNew/AddNew';
import EditRun from '../EditRun/EditRun';
import RunDetail from '../RunDetail/RunDetail';

import homeStyles from './UserHome.module.scss';

const UserHome = ({ user, userRuns, setRun, selectedRun }) => {
  let { path, url } = useRouteMatch();

  return (
    <div className='gridWrapper'>
      <nav className={homeStyles.sideNav}>
        <ul>
          <li>
            <NavLink to={url}>Calendar</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/list`}>All runs</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/profile`}>Profile</NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path={`${path}/list`}>
          <ListView user={user} userRuns={userRuns} setRun={setRun} selectedRun={selectedRun} />
        </Route>
        <Route path={`${path}/shoes`}>
          <Shoes />
        </Route>
        <Route path={`${path}/profile`}>
          <Profile />
        </Route>
        <Route path={`${path}/runs/add`}>
          <AddNew user={user} />
        </Route>
        <Route path={`${path}/runs/:runId/edit`}>
          <EditRun user={user} run={selectedRun} setRun={setRun} />
        </Route>
        <Route path={`${path}/runs/:runId`}>
          <RunDetail user={user} run={selectedRun} setRun={setRun} />
        </Route>
        <Route path={path}>
          <Dashboard user={user} userRuns={userRuns} setRun={setRun} selectedRun={selectedRun} />
        </Route>
      </Switch>
    </div>
  );
};

export default UserHome;