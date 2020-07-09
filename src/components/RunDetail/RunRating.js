import React from 'react';
import { PieChart, Pie } from 'recharts';
import styled from 'styled-components';

const RunRating = ({ number, heading, type }) => {
  const colors = {
    1: '#EE6461',
    2: '#F37542',
    3: '#ECAB47',
    4: '#67E4AA',
    5: '#50C376'
  };

  const ratingData = [];

  for (let i = 1; i <=5; i++) {
    ratingData.push({ name: `${i}`, value: 1, fill: i <= number ? colors[i] : "#171F26"})
  }

  return (
    <div>
      <RatingHeader>{heading}</RatingHeader>
      <RatingContainer ratingcolor={colors[number]}>
        <RatingNumber>{number}</RatingNumber>
        <PieChart width={60} height={60}>
          <Pie data={ratingData} dataKey="value" cx="50%" cy="50%" outerRadius={29} innerRadius={19} stroke="#171F26" startAngle={90} endAngle={450} />
        </PieChart>
      </RatingContainer>
    </div>
  );
}

export default RunRating;

const RatingHeader = styled.h4`
  font-family: var(--font-condensed);
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.4rem;
  margin-bottom: 1.4rem;
`;

const RatingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--color-background-dark);
  --ratingcolor: ${props => props.ratingcolor};
  > * {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
`;

const RatingNumber = styled.p`
  font-family: var(--font-heading);
  font-size: 3.4rem;
  font-weight: 800;
  margin: -2px 0 0 -2px;
  color: var(--ratingcolor);
`;
