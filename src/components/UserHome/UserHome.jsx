import React from 'react';
import { Route, Switch, NavLink, useRouteMatch } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import { FiList } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import Dashboard from '../Dashboard/Dashboard';
import ListView from '../ListView/ListView';
import Profile from '../Profile/Profile';
import Shoes from '../Shoes/Shoes';
import AddNew from '../AddNew/AddNew';
import EditRun from '../EditRun/EditRun';
import RunDetail from '../RunDetail/RunDetail';

import homeStyles from './UserHome.module.scss';

const UserHome = ({ user, userRuns, setRun, selectedRun, addRunToState, removeRunFromState, replaceEditedRun }) => {
  let { path, url } = useRouteMatch();

  return (
    <div className='gridWrapper'>
      <nav className={homeStyles.sideNav}>
        <ul>
          <li>
            <NavLink to={url}><FiCalendar /><span className={homeStyles.navText}>Calendar</span></NavLink>
          </li>
          <li>
            <NavLink to={`${url}/list`}><FiList /><span className={homeStyles.navText}>All runs</span></NavLink>
          </li>
          <li>
            <NavLink to={`${url}/profile`}><FiUser /><span className={homeStyles.navText}>Profile</span></NavLink>
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
          <Profile user={user} userRuns={userRuns} />
        </Route>
        <Route path={`${path}/runs/add`}>
          <AddNew user={user} addRunToState={addRunToState} />
        </Route>
        <Route path={`${path}/runs/:runId/edit`}>
          <EditRun user={user} run={selectedRun} setRun={setRun} replaceEditedRun={replaceEditedRun} />
        </Route>
        <Route path={`${path}/runs/:runId`}>
          <RunDetail user={user} run={selectedRun} setRun={setRun} removeRunFromState={removeRunFromState} />
        </Route>
        <Route path={path}>
          <Dashboard user={user} userRuns={userRuns} setRun={setRun} selectedRun={selectedRun} />
        </Route>
      </Switch>
    </div>
  );
};

export default UserHome;