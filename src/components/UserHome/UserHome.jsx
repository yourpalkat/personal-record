import React from 'react';
import { Route, Switch, NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRun, addRun, removeRun, replaceRun } from '../../redux/actions';

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

const UserHome = () => {
  let { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userRuns = useSelector(state => state.userRuns);
  const selectedRun = useSelector(state => state.selectedRun);

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
          <ListView 
            user={user} 
            userRuns={userRuns} 
            setRun={(run) => dispatch(setSelectedRun(run))} 
            selectedRun={selectedRun} />
        </Route>
        <Route path={`${path}/shoes`}>
          <Shoes />
        </Route>
        <Route path={`${path}/profile`}>
          <Profile user={user} userRuns={userRuns} />
        </Route>
        <Route path={`${path}/runs/add`}>
          <AddNew user={user} addRunToState={(run) => dispatch(addRun(run))} />
        </Route>
        <Route path={`${path}/runs/:runId/edit`}>
          <EditRun 
            user={user} 
            run={selectedRun} 
            setRun={(run) => dispatch(setSelectedRun(run))} 
            replaceEditedRun={(run) => dispatch(replaceRun(run))} />
        </Route>
        <Route path={`${path}/runs/:runId`}>
          <RunDetail 
            user={user} 
            run={selectedRun} 
            setRun={(run) => dispatch(setSelectedRun(run))} 
            removeRun={(run) => dispatch(removeRun(run))} />
        </Route>
        <Route path={path}>
          <Dashboard 
            user={user} 
            userRuns={userRuns} 
            setRun={(run) => dispatch(setSelectedRun(run))} 
            selectedRun={selectedRun} />
        </Route>
      </Switch>
    </div>
  );
};

export default UserHome;