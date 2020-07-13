import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRun } from '../../redux/actions';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Button from '../Button/Button';

import 'react-big-calendar/lib/sass/styles.scss';
import './CalendarEventStyles.scss';

const CalendarView = () => {
  const localizer = momentLocalizer(moment);
  const [viewRun, setViewRun] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userRuns = useSelector(state => state.userRuns);
  const selectedRun = useSelector(state => state.selectedRun);

  return (
    <>
      {selectedRun && selectedRun._id && viewRun ? <Redirect to={`/users/${user._id}/runs/${selectedRun._id}`} /> : (
        <CalendarSection>
          <TitleBlock>
            <h2>{user.firstName}’s workouts &emsp;</h2>
            <Button
              buttonType='link'
              linkPath={`/users/${user._id}/runs/add`}
              buttonStyle='confirm'
              text='Add New Run' />
          </TitleBlock>
          <CalendarContainer>
            <Calendar
              localizer={localizer}
              events={userRuns}
              step={30}
              defaultView='month'
              views={['month', 'week']}
              defaultDate={new Date()}
              onSelectEvent={(event) => {
                dispatch(setSelectedRun(event));
                setViewRun(true);
              }}
              eventPropGetter={(event) => { return { className: `${event.workoutType}Run` } }}
            />
          </CalendarContainer>
        </CalendarSection>
      )}
    </>
  );
}

export default CalendarView;

const CalendarSection = styled.section`
  grid-column: 2 / -2;
  padding: 4rem 0;
`;

const TitleBlock = styled.div`
  color: var(--color-white);
  margin-bottom: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h2 {
    margin-right: 4rem;
  }
`;

const CalendarContainer = styled.div`
  color: var(--color-white);
  font-family: var(--font-condensed);
  height: 660px;

  @media(max-width: 749px) {
    height: 360px;
  }
`;