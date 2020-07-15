import React from 'react';
import { Route, Switch, NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRun, addRun, replaceRun } from '../../redux/actions';
import styled from 'styled-components';

import { FiHome, FiCalendar, FiList, FiUser } from 'react-icons/fi';

import { GridWrapper } from '../../elements/Layouts';
import CalendarView from '../Calendar/Calendar';
import Dashboard from '../Dashboard/Dashboard';
import ListView from '../ListView/ListView';
import Profile from '../Profile/Profile';
import Shoes from '../Shoes/Shoes';
import AddNew from '../AddNew/AddNew';
import EditRun from '../EditRun/EditRun';
import RunDetail from '../RunDetail/RunDetail';

const UserHome = () => {
  let { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const selectedRun = useSelector(state => state.selectedRun);

  return (
    <GridWrapper>
      <Navigation>
        <NavUl>
          <li>
            <NavLink exact to={url}><FiHome /><span>Dashboard</span></NavLink>
          </li>
          <li>
            <NavLink to={`${url}/calendar`}><FiCalendar /><span>Calendar</span></NavLink>
          </li>
          <li>
            <NavLink to={`${url}/list`}><FiList /><span>All runs</span></NavLink>
          </li>
          <li>
            <NavLink to={`${url}/profile`}><FiUser /><span>Profile</span></NavLink>
          </li>
        </NavUl>
      </Navigation>

      <Switch>
        <Route path={`${path}/calendar`}>
          <CalendarView />
        </Route>
        <Route path={`${path}/list`}>
          <ListView />
        </Route>
        <Route path={`${path}/shoes`}>
          <Shoes />
        </Route>
        <Route path={`${path}/profile`}>
          <Profile />
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
          <RunDetail />
        </Route>
        <Route path={path}>
          <Dashboard />
        </Route>
      </Switch>
    </GridWrapper>
  );
};

export default UserHome;

const Navigation = styled.nav`
  grid-column: 2 / -2;
  padding: 3rem 0;

  a {
    color: var(--color-white);
    font-family: var(--font-condensed);
    font-size: 2.1rem;
    text-decoration: none;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid transparent;
    transition: border-bottom 0.3s ease;
  }
  a:hover,
  a:focus {
    border-bottom: 2px solid var(--color-primary);
  }
  & a.active {
    border-bottom: 2px solid var(--color-primary);
  }
  a svg {
    margin-right: 2rem;
  }

  @media(max-width: 749px) {
    span {
      display: none;
    }
    a svg {
      margin-right: 0;
    }
  }
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: center;

  li:not(:last-of-type) {
    margin-right: 8rem;
    @media(max-width: 749px) {
      margin-right: 4rem;
    }
  }
`;