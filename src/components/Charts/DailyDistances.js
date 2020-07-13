import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';

import colors from '../../elements/colors';

const DailyDistances = () => {
  const allRuns = useSelector(state => state.userRuns);

  // get today's date
  const today = new Date();
  const prior = new Date().setDate(today.getDate() - 14);
  // prior gets a new date from 14 days ago, but then it has to be parsed back into a JS Date object
  const twoWeeksAgo = new Date(prior);

  // filter allRuns to get every completed run within the last 14 days
  const filteredRuns = allRuns.filter(run => new Date(run.start) > twoWeeksAgo  && new Date(run.start) < today && run.completed === true);

  // create an array of the last 14 days of data to graph, with 0 default distances for each
  const graphArray = [];
  for (let i = 0; i < 14; i++) {
    const runDate = new Date(new Date().setDate(today.getDate() - i));
    const name = `${runDate.getDate()}-${runDate.getMonth() + 1}-${runDate.getFullYear()}`;
    graphArray.push({
      name,
      default: 0,
      easy: 0,
      recovery: 0,
      hills: 0,
      tempo: 0,
      intervals: 0,
      long: 0,
      race: 0,
    })
  };

  // iterate through our filtered run array and add each distance to the appropriate day of our graph array
  // we're allowing for the fact that we can have more than one run per day
  for (let i = 0; i < filteredRuns.length; i++) {
    const runDate = new Date(filteredRuns[i].start);
    const name = `${runDate.getDate()}-${runDate.getMonth() + 1}-${runDate.getFullYear()}`;
    const index = graphArray.findIndex(run => run.name === name);
    const runType = filteredRuns[i].workoutType.toLowerCase();
    const runDistance = filteredRuns[i].distance;
    graphArray[index][runType] = graphArray[index][runType] + runDistance;
  }

  // reverse our graphArray so it's reverse-chronological
  const sortedRuns = graphArray.reverse();

  // use our sorted array in a ReChart Bar Chart with a bar object for each run type, making a stacked bar

  return (
    <div>
      <h3>Run distances</h3>
      <h4>Last 2 weeks</h4>
        <BarChart
          width={window.innerWidth > 375 ? 480 : 325}
          height={300}
          data={sortedRuns}
          margin={{ top: 0, right: 30, left: -40, bottom: 5, }}
        >
          <XAxis dataKey="name" stroke={colors.white} fontFamily={'Roboto Condensed, sans-serif'} />
          <YAxis stroke={colors.white} fontFamily={'Roboto Condensed, sans-serif'} />
          <Bar dataKey="default" stackId="a" fill={colors.defaultColor} />
          <Bar dataKey="easy" stackId="a" fill={colors.easy} />
          <Bar dataKey="recovery" stackId="a" fill={colors.recovery} />
          <Bar dataKey="hills" stackId="a" fill={colors.hills} />
          <Bar dataKey="tempo" stackId="a" fill={colors.tempo} />
          <Bar dataKey="intervals" stackId="a" fill={colors.intervals} />
          <Bar dataKey="long" stackId="a" fill={colors.long} />
          <Bar dataKey="race" stackId="a" fill={colors.race} />
          <Legend 
            verticalAlign='top' 
            height={60}
            align='left' 
            wrapperStyle={{ left: 0, fontFamily: 'Roboto Condensed, sans-serif', width: '80%' }}
          />
        </BarChart>
    </div>
  );
}

export default DailyDistances;
