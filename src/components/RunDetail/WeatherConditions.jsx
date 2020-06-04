import React from 'react';

import { WiDaySunny, WiHot, WiCloudyGusts, WiSnow, WiRain } from 'react-icons/wi';

const WeatherConditions = ({ weatherCondition }) => {
  if (weatherCondition === 'Sunny') {
    return <WiDaySunny />;
  } else if (weatherCondition === 'Humid') {
    return <WiHot />;
  } else if (weatherCondition === 'Wind') {
    return <WiCloudyGusts />;
  } else if (weatherCondition === 'Snow') {
    return <WiSnow />;
  } else if (weatherCondition === 'Rain') {
    return <WiRain />;
  } else return null;
}

export default WeatherConditions;