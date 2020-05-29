import React from 'react';

import { AiOutlineDashboard } from 'react-icons/ai';
import { MdLocalHospital } from 'react-icons/md';
import { IoMdTrophy, IoMdStopwatch } from 'react-icons/io';
import { FaRunning, FaMountain, FaHourglassHalf } from 'react-icons/fa';
import { GiFootprint } from 'react-icons/gi';

import runTypeStyles from './RunTypeIndicator.module.scss';

const RunTypeIndicator = ({ runType }) => {

  let icon;

  switch (runType) {
    case 'Easy':
      icon = <FaRunning />;
      break;
    case 'Recovery':
      icon = <MdLocalHospital />;
      break;
    case 'Hills':
      icon = <FaMountain />
      break;
    case 'Tempo':
      icon = <AiOutlineDashboard />;
      break;
    case 'Intervals':
      icon = <IoMdStopwatch />;
      break;
    case 'Long':
      icon = <FaHourglassHalf />;
      break;
    case 'Race':
      icon = <IoMdTrophy />;
      break;
    default: 
      icon = <GiFootprint />;
  }
  const runClass = `run${runType}`;
  
  return (
    <div className={runTypeStyles.container}>
      <div className={`${runTypeStyles.iconWrapper} ${runTypeStyles[runClass]}`}>{icon}</div>
      <p>{runType}</p>
    </div>
  );
}

export default RunTypeIndicator;