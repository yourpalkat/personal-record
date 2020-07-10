import React, { useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import styled from 'styled-components';
import { RunDetailSubhead, BigNumbers, Units } from '../../elements/Typography';
import { AiOutlineCloseSquare, AiOutlineCalendar } from 'react-icons/ai';
import { Toggle } from '../../utilities';

import Button from '../Button/Button';
import RunRating from './RunRating';
import DeleteRun from '../DeleteRun/DeleteRun';
import RunWeather from './RunWeather';
import RunType from './RunType';
import Modal from '../Modal';

const RunDetail = ({ user, run, setRun, removeRun }) => {
  const isMountedRef = useRef(null);

  useEffect(() => {
    // set flag that component is mounted and thus async functions can run
    isMountedRef.current = true;
    // return a function to set mounted flag to false, so async functions won't run
    return () => isMountedRef.current = false;
  }, []);

  const displayRun = run;
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
      {!run._id ? <Redirect to={`/users/${user._id}`} /> : (
        <RunDetailSection>
          <SectionHeading>{displayRun.title}</SectionHeading>
          <CloseContainer>
            <CloseButton 
              type='button'
              aria-label='Close this view'
              onClick={() => setRun({})}>
              <AiOutlineCloseSquare />
            </CloseButton>
          </CloseContainer>

          <DateContainer>
            <AiOutlineCalendar />
            <h3><Moment date={displayRun.start} format='D MMMM YYYY, h:mm a' /></h3>
          </DateContainer>

          <WeatherContainer>
            {displayRun.tempInC && (
              <p>{displayRun.tempInC}°C</p>
            )}
            {displayRun.weather.length > 0 && (
              <WeatherList>
                {displayRun.weather.map(condition => (
                  <li key={`weather-${condition}`} title={condition}>
                    <RunWeather weatherCondition={condition} />
                  </li>
                ))}
              </WeatherList>
            )}
          </WeatherContainer>

          <DistanceContainer>
            <RunDetailSubhead>Distance:</RunDetailSubhead>
            <BigNumbers>{displayDistance}</BigNumbers>
            <Units>km</Units>
          </DistanceContainer>

          <DurationContainer>
            <RunDetailSubhead>Duration:</RunDetailSubhead>
            <BigNumbers>{displayRun.elapsedTime.format('h:mm:ss')}</BigNumbers>
            <Units>hh:mm:ss</Units>
          </DurationContainer>

          <PaceContainer>
            <RunDetailSubhead>Pace:</RunDetailSubhead>
            <BigNumbers>{paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds}</BigNumbers>
            <Units>min/km</Units>
          </PaceContainer>

          <WorkoutTypeContainer>
            <RunDetailSubhead>Workout type:</RunDetailSubhead>
            <RunType runType={displayRun.workoutType} />
          </WorkoutTypeContainer>

          {displayRun.workoutType === 'Race' && (
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
          
          {displayRun.effort || displayRun.rating ? (
            <EffortRatingContainer>
              {displayRun.effort && <RunRating number={displayRun.effort} heading='effort' type='effort' />}
              {displayRun.rating && <RunRating number={displayRun.rating} heading='rating' type='rating' />}
            </EffortRatingContainer>
          ) : ( null )}

          {displayRun.treadmill && <TreadmillContainer><p>Treadmill run</p></TreadmillContainer>}

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
                    <DeleteRun setRun={setRun} toggle={toggle} run={displayRun} removeRun={removeRun} />
                  </Modal>
                </>
              )}
            </Toggle>

            <Button 
              buttonType='link'
              buttonStyle='confirm'
              text='Edit run'
              linkPath={`/users/${user._id}/runs/${run._id}/edit`} />
          </EditDeleteContainer>
        </RunDetailSection>
      )}
    </>
  );
}

export default RunDetail;

const RunDetailSection = styled.section`
  grid-column: 2 / -2;
  color: var(--color-white);
  padding: 8rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;

  @media(max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SectionHeading = styled.h2`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  color: var(--color-white);
  font-size: 3.2rem;
  margin-top: 0;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-primary);
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
  color: var(--color-white);
  transition: color 0.3s ease;

  &:hover,
  &:focus {
    color: var(--color-primary);
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

  @media(max-width: 1024px) {
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

  @media(max-width: 1024px) {
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

  @media(max-width: 1024px) {
    grid-row-start: 6;
  }
  @media(max-width: 600px) {
    grid-column: 1 / -1;
    grid-row-start: 7;
  }
  @media(max-width: 375px) {
    grid-row: 8 / 9;
  }
`;

const EffortRatingContainer = styled.div`
  grid-column: 2 / -1;
  display: flex;

  & > div:first-of-type {
    margin-inline-end: 6rem;
  }

  @media(max-width: 600px) {
    grid-column: 2 / -1;
    grid-row: 5 / 6;
  }
  @media(max-width: 375px) {
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
  @media(max-width: 600px) {
    grid-column: 1 / 2;
  }
`;
  
const DurationContainer = styled.div`
  @media(max-width: 600px) {
    grid-column: 2 / -1;
  }
  @media(max-width: 375px) {
    grid-column: 1 / -1;
  }
`;

const PaceContainer = styled.div`
  @media(max-width: 600px) {
    grid-column: 1 / 2;
    grid-row: 5 / 6;
  }
  @media(max-width: 375px) {
    grid-column: 2 / -1;
    grid-row: 4 / 5;
  }
`;

const WorkoutTypeContainer = styled.div`
  @media(max-width: 600px) {
    grid-column: 1 / -1;
  }
  @media(max-width: 375px) {
    grid-row: 7 / 8;
  }
`;