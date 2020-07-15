import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '../Button/Button';
import ListItem from './ListItem';
import { PageSection, TitleBlock } from '../../elements/Layouts';
import { colors, breakpoints } from '../../elements';

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
  const byTypeDesc = (a, b) => {
    if(b.workoutType < a.workoutType) return -1;
    if(b.workoutType > a.workoutType) return 1;
    return 0;
  };
  const byTypeAsc = (a, b) => {
    if (a.workoutType < b.workoutType) return -1;
    if (a.workoutType > b.workoutType) return 1;
    return 0;
  };

  useEffect(() => {
    const filteredRuns = userRuns.filter(run => run.completed === true);
    const sortedRuns = filteredRuns.sort(byDateDesc);
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
      <PageSection>
        <TitleBlock>
          <h2>{user.firstName}’s workouts &emsp;</h2>
          <Button
            buttonType='link'
            linkPath={`/users/${user._id}/runs/add`}
            buttonStyle='confirm'
            text='Add New Run' />
        </TitleBlock>

        <ul>
          <ListHeader>
            <HeaderButton type='button' onClick={() => sortRuns('date')}>
              <h4>
                Date
                {sortedBy === 'dateAsc' && <ArrowUp />}
                {sortedBy === 'dateDesc' && <ArrowDown />}
              </h4>
            </HeaderButton>
            <HeaderButton type='button' onClick={() => sortRuns('dist')}>
              <h4>
                Dist
                {sortedBy === 'distAsc' && <ArrowUp />}
                {sortedBy === 'distDesc' && <ArrowDown />}
              </h4>
            </HeaderButton>
            <HeaderButton type='button' onClick={() => sortRuns('type')}>
              <h4>
                Type
                {sortedBy === 'typeAsc' && <ArrowUp />}
                {sortedBy === 'typeDesc' && <ArrowDown />}
              </h4>
            </HeaderButton>
            <HeaderTotals>Runs 1&ndash;{displayRuns.length} of {displayRuns.length}</HeaderTotals>
          </ListHeader>
          {displayRuns.map((run, i) => <ListItem key={`runItem${i}`} run={run} user={user} setNavTo={setNavTo} />)}
        </ul>
      </PageSection>
    </>
  );
};

export default ListView;

const ListHeader = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 25%) 1fr 1fr;
  grid-column-gap: 1fr;
  border-bottom: 2px solid ${colors.primary};
`;

const HeaderTotals = styled.p`
  grid-column: 4 / -1;
  color: ${colors.white};
  font-size: 1.4rem;
  align-self: center;
  justify-self: end;

  @media(max-width: ${breakpoints.mobile}) {
    grid-column: 1 / -1;
    grid-row-start: 1;
  }
`;

const HeaderButton = styled.button`
  appearance: none;
  background: transparent;
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  color: ${colors.white};
  text-align: left;
  justify-self: start;
`;

const Arrow = styled.div`
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  margin-inline-start: 1.8rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: ${breakpoints.mobile}) {
    margin-inline-start: 1.4rem;
    width: 1.3rem;
    height: 1.3rem;
  }
`;

const ArrowUp = styled(Arrow)`
  background-image: url('../../assets/arrowUpSolid.svg');
`;

const ArrowDown = styled(Arrow)`
  background-image: url('../../assets/arrowDownSolid.svg');
`;
