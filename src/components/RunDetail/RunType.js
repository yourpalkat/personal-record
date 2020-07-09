import React from 'react';
import styled from 'styled-components';

import { AiOutlineDashboard } from 'react-icons/ai';
import { MdLocalHospital } from 'react-icons/md';
import { IoMdTrophy, IoMdStopwatch } from 'react-icons/io';
import { FaRunning, FaMountain, FaHourglassHalf } from 'react-icons/fa';
import { GiFootprint } from 'react-icons/gi';

const RunTypeIndicator = ({ runType }) => {

  let icon, color;

  switch (runType) {
    case 'Easy':
      icon = <FaRunning />;
      color = '#67E4AA';
      break;
    case 'Recovery':
      icon = <MdLocalHospital />;
      color = '#829FD6';
      break;
    case 'Hills':
      icon = <FaMountain />
      color = '#ECAB47';
      break;
    case 'Tempo':
      icon = <AiOutlineDashboard />;
      color = '#BE3BCE';
      break;
    case 'Intervals':
      icon = <IoMdStopwatch />;
      color = '#F37542';
      break;
    case 'Long':
      icon = <FaHourglassHalf />;
      color = '#6C50D8';
      break;
    case 'Race':
      icon = <IoMdTrophy />;
      color = '#C0268B';
      break;
    default: 
      icon = <GiFootprint />;
      color = '#4F6970';
  }
  
  return (
    <RunTypeContainer runcolor={color}>
      <IconWrapper>{icon}</IconWrapper>
      <RunTypeLabel>{runType}</RunTypeLabel>
    </RunTypeContainer>
  );
}

export default RunTypeIndicator;

const RunTypeContainer = styled.div`
  display: flex;
  align-items: center;
  --runcolor: ${props => props.runcolor};
`;

const RunTypeLabel = styled.p`
  font-family: var(--font-heading);
  font-size: 3.4rem;
  font-weight: 800;
  margin: 0;
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
  margin-inline-end: 2.4rem;
  color: var(--runcolor);

  svg {
    font-size: 4.2rem;
  }
`;