import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import styled from 'styled-components';

import { colors } from '../../elements';

const PlannedRuns = () => {
  const allRuns = useSelector(state => state.userRuns);

  // get today's date
  const today = new Date();
  const oneWeekHence = new Date().setDate(today.getDate() + 7);
  // twoWeeksHence has to be parsed back into a JS Date object
  const deadline = new Date(oneWeekHence);

  // filter allRuns to get every non-completed run within the next 7 days
  const filteredRuns = allRuns.filter(run => new Date(run.start) < deadline && new Date(run.start) > today && run.completed === false);

  // sort filteredRuns chronologically 
  const byDateAsc = (a, b) => new Date(a.start) - new Date(b.start);
  const sortedRuns = filteredRuns.sort(byDateAsc);


  return (
    <div>
      <h3>Upcoming planned runs</h3>
      <h4>Next 7 days</h4>
      <ListBox>
        { sortedRuns.length === 0 && <li><p>Nothing planned for the next week.</p></li>}
        { sortedRuns.map((run, i) => 
          <li key={`runItem${i}`}>
            <p>
              <span><Moment date={run.start} format='D MMMM YYYY' />: </span>
              {run.distance}km {run.workoutType}
            </p>
          </li>
        )}
      </ListBox>
    </div>
  );
};

export default PlannedRuns;

const ListBox = styled.ul`
  padding: 1.6rem;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  min-width: 260px;

  span {
    font-weight: 800;
  }
  p {
    margin: 0;
  }
  li + li {
    margin-top: 1.6rem;
    border-top: 1px solid ${colors.defaultColor};
    padding-top: 1.4rem;
  }
`;