import React, { useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRun } from '../../redux/actions';
import moment from 'moment';
import styled from 'styled-components';

import { RunDetailSubhead, BigNumbers, Units } from '../../elements/Typography';
import { colors, breakpoints } from '../../elements';
import { AiOutlineCloseSquare, AiOutlineCalendar } from 'react-icons/ai';
import { Toggle } from '../../utilities';

import Button from '../Button/Button';
import RunRating from './RunRating';
import DeleteRun from '../DeleteRun/DeleteRun';
import RunWeather from './RunWeather';
import RunType from './RunType';
import Modal from '../Modal';

const RunDetail = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const selectedRun = useSelector(state => state.selectedRun);

  const isMountedRef = useRef(null);

  useEffect(() => {
    // set flag that component is mounted and thus async functions can run
    isMountedRef.current = true;
    // return a function to set mounted flag to false, so async functions won't run
    return () => isMountedRef.current = false;
  }, []);

  const displayRun = {...selectedRun};
  let start = new moment(displayRun.start);
  let end = new moment(displayRun.end);
  displayRun.elapsedTime = moment.duration(end.diff(start));
  const seconds = moment.duration(end.diff(start)).as('seconds');
  const pace = seconds / displayRun.distance;
  const paceMinutes = Math.floor(pace / 60);
  const paceSeconds = Math.round(pace % 60);

  let displayDistance = displayRun.distance;
  if (displayDistance && !displayDistance.toString().includes('.')) displayDistance = displayDistance + '.0';

  return (
    <>
      {!selectedRun._id ? <Redirect to={`/users/${user._id}`} /> : (
        <RunDetailSection>
          <SectionHeading>{displayRun.title}</SectionHeading>
          <CloseContainer>
            <CloseButton 
              type='button'
              aria-label='Close this view'
              onClick={() => dispatch(setSelectedRun({}))}>
              <AiOutlineCloseSquare />
            </CloseButton>
          </CloseContainer>

          <DateContainer>
            <AiOutlineCalendar />
            {displayRun.completed ? (
              <h3><Moment date={displayRun.start} format='D MMMM YYYY, h:mm a' /></h3>
            ) : ( 
              <h3><Moment date={displayRun.start} format='D MMMM YYYY' /></h3>
            )}

          </DateContainer>

          <WeatherContainer>
            {displayRun.tempInC && displayRun.completed && (
              <p>{displayRun.tempInC}°C</p>
            )}
            {displayRun.weather.length > 0 && displayRun.completed && (
              <WeatherList>
                {displayRun.weather.map(condition => (
                  <li key={`weather-${condition}`} title={condition}>
                    <RunWeather weatherCondition={condition} />
                  </li>
                ))}
              </WeatherList>
            )}
            {displayRun.completed === false && <p>This is a planned run.</p>}
          </WeatherContainer>

          <DistanceContainer>
            <RunDetailSubhead>Distance:</RunDetailSubhead>
            <BigNumbers>{displayDistance}</BigNumbers>
            <Units>km</Units>
          </DistanceContainer>

          { displayRun.completed && (
            <DurationContainer>
              <RunDetailSubhead>Duration:</RunDetailSubhead>
              <BigNumbers>{displayRun.elapsedTime.format('h:mm:ss')}</BigNumbers>
              <Units>hh:mm:ss</Units>
            </DurationContainer>
          )}
          { displayRun.completed && (
            <PaceContainer>
              <RunDetailSubhead>Pace:</RunDetailSubhead>
              <BigNumbers>{paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds}</BigNumbers>
              <Units>min/km</Units>
            </PaceContainer>
          )}

          <WorkoutTypeContainer>
            <RunDetailSubhead>Workout type:</RunDetailSubhead>
            <RunType runType={displayRun.workoutType} />
          </WorkoutTypeContainer>

          {displayRun.workoutType === 'Race' && displayRun.completed && (
            <RaceInfoContainer>
              {displayRun.racePosition && (
                <div>
                  <RunDetailSubhead>Position:</RunDetailSubhead>
                  <BigNumbers>{displayRun.racePosition}</BigNumbers>
                  {displayRun.raceFieldSize && <Units>out of {displayRun.raceFieldSize}</Units>}
                </div>

              )}
              {displayRun.raceAgePosition && (
                <div>
                  <RunDetailSubhead>Age group:</RunDetailSubhead>
                  <BigNumbers>{displayRun.raceAgePosition}</BigNumbers>
                  {displayRun.raceAgeFieldSize && <Units>out of {displayRun.raceAgeFieldSize}</Units>}
                </div>
              )}
            </RaceInfoContainer>
          )}
          
          {(displayRun.effort && displayRun.completed) || (displayRun.rating && displayRun.completed) ? (
            <EffortRatingContainer>
              {displayRun.effort && <RunRating number={displayRun.effort} heading='effort' />}
              {displayRun.rating && <RunRating number={displayRun.rating} heading='rating' />}
            </EffortRatingContainer>
          ) : ( null )}

          {displayRun.treadmill && displayRun.completed && <TreadmillContainer><p>Treadmill run</p></TreadmillContainer>}

          {displayRun.notes && (
            <NotesContainer>
              <RunDetailSubhead>Notes:</RunDetailSubhead>
              <p>{displayRun.notes}</p>
            </NotesContainer>
          )}

          <EditDeleteContainer>
            <Toggle>
              {({ on, toggle }) => (
                <>
                  <Button
                    buttonType='button'
                    buttonStyle='danger'
                    text='Delete run'
                    eventHandler={toggle} />
                  <Modal on={on} toggle={toggle}>
                    <DeleteRun toggle={toggle} run={displayRun} />
                  </Modal>
                </>
              )}
            </Toggle>

            <Button 
              buttonType='link'
              buttonStyle='confirm'
              text='Edit run'
              linkPath={`/users/${user._id}/runs/${displayRun._id}/edit`} />
          </EditDeleteContainer>
        </RunDetailSection>
      )}
    </>
  );
}

export default RunDetail;

const RunDetailSection = styled.section`
  grid-column: 2 / -2;
  color: ${colors.white};
  padding: 8rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;

  @media(max-width: ${breakpoints.mobilemed}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SectionHeading = styled.h2`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  color: ${colors.white};
  font-size: 3.2rem;
  margin-top: 0;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${colors.primary};
`;

const CloseContainer = styled.div`
  text-align: right;
  grid-column: -2 / -1;
  grid-row: 1 / 2;
  align-self: start;
`;

const CloseButton = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  font-size: 2.5rem;
  color: ${colors.white};
  transition: stroke 0.3s ease;

  &:hover,
  &:focus {
    color: ${colors.primary};
  }
`;

const EditDeleteContainer = styled.div`
  margin-top: 6rem;
  grid-column: 1 / -1;

  button:first-of-type {
    margin-right: 2rem;
  }
`;

const DateContainer = styled.div`
  grid-column: 1 / 2;
  display: flex;
  align-items: center;

  > * {
    margin-block: 0;
  }
  svg {
    font-size: 2.4rem;
    margin-inline-end: 2.4rem;
  }

  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 1 / -1;
  }
`;

const WeatherContainer = styled.div`
  grid-column: 2 / -1;
  display: flex;
  align-items: center;

  p {
    font-weight: 800;
    font-size: 2.4rem;
    margin-inline-end: 3rem;
    margin-block: 0;
  }

  @media(max-width: ${breakpoints.tablet}) {
    grid-column: 1 / -1;
  }
`;

const WeatherList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;

  li {
    margin-block-start: 0;
    margin-block-end: -6px;
    margin-inline-end: 3rem;
    font-size: 3.4rem;
  }
`;

const RaceInfoContainer = styled.div`
  grid-column: 1 / -1;
  grid-row-start: 5;
  display: flex;

  & > div:first-of-type {
    margin-inline-end: 6rem;
  }

  @media(max-width: ${breakpoints.tablet}) {
    grid-row-start: 6;
  }
  @media(max-width: ${breakpoints.mobilemed}) {
    grid-column: 1 / -1;
    grid-row-start: 7;
  }
  @media(max-width: ${breakpoints.mobilesmall}) {
    grid-row: 8 / 9;
  }
`;

const EffortRatingContainer = styled.div`
  grid-column: 2 / -1;
  display: flex;

  & > div:first-of-type {
    margin-inline-end: 6rem;
  }

  @media(max-width: ${breakpoints.mobilemed}) {
    grid-column: 2 / -1;
    grid-row: 5 / 6;
  }
  @media(max-width: ${breakpoints.mobilesmall}) {
    grid-column: 1 / -1;
    grid-row: 6 / 7;
  }
`;

const TreadmillContainer = styled.div`
  padding-top: 3.2rem;
  grid-column: 1 / -1;

  p {
    font-size: 1.8rem;
    font-weight: 100;
    margin-top: -0.4rem;
  }
`;

const NotesContainer = styled.div`
  grid-column: 1 / -1;

  p {
    font-family: var(--font-condensed);
    font-size: 1.8rem;
    font-weight: 100;
    line-height: 1.6;
  }
`;

const DistanceContainer = styled.div`
  @media(max-width: ${breakpoints.mobilemed}) {
    grid-column: 1 / 2;
  }
`;
  
const DurationContainer = styled.div`
  @media(max-width: ${breakpoints.mobilemed}) {
    grid-column: 2 / -1;
  }
  @media(max-width: ${breakpoints.mobilesmall}) {
    grid-column: 1 / -1;
  }
`;

const PaceContainer = styled.div`
  @media(max-width: ${breakpoints.mobilemed}) {
    grid-column: 1 / 2;
    grid-row: 5 / 6;
  }
  @media(max-width: ${breakpoints.mobilesmall}) {
    grid-column: 2 / -1;
    grid-row: 4 / 5;
  }
`;

const WorkoutTypeContainer = styled.div`
  @media(max-width: ${breakpoints.mobilemed}) {
    grid-column: 1 / -1;
  }
  @media(max-width: ${breakpoints.mobilesmall}) {
    grid-row: 7 / 8;
  }
`;