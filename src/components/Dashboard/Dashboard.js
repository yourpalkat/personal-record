import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Button from '../Button/Button';
import DailyDistances from '../Charts/DailyDistances';

const Dashboard = () => {
  const user = useSelector(state => state.user);

  return(
    <DashboardSection>
      <TitleBlock>
        <h2>Dashboard</h2>
        <Button
          buttonType='link'
          linkPath={`/users/${user._id}/runs/add`}
          buttonStyle='confirm'
          text='Add New Run' />
      </TitleBlock>

      <ChartBlock>
        <DailyDistances />
      </ChartBlock>
    </DashboardSection>
  );
}

export default Dashboard;

const DashboardSection = styled.section`
  grid-column: 2 / -2;
  padding: 4rem 0;
  color: var(--color-white);
`;

const TitleBlock = styled.div`
  margin-bottom: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-primary);

  h2 {
    margin-right: 4rem;
  }
`;

const ChartBlock = styled.div`
  margin-top: 2rem;
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;
`;