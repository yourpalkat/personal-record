import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Button from '../Button/Button';
import DailyDistances from '../Charts/DailyDistances';
import { PageSection, TitleBlock } from '../../elements/Layouts';

const Dashboard = () => {
  const user = useSelector(state => state.user);

  return(
    <PageSection>
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
    </PageSection>
  );
}

export default Dashboard;

const ChartBlock = styled.div`
  margin-top: 2rem;
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;
`;