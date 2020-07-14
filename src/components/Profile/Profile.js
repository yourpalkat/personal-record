import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { PageSection, TitleBlock } from '../../elements/Layouts';

const Profile = () => {
  const user = useSelector(state => state.user);
  const userRuns = useSelector(state => state.userRuns);
  const total = userRuns.reduce((acc, curr) => acc + curr.distance, 0).toFixed(2);
  
  return (
    <PageSection>
      <TitleBlock>
        <h2>{user.firstName} {user.lastName}</h2>
      </TitleBlock>
      <ProfileItem>Email: {user.email}</ProfileItem>
      <ProfileItem>Runs logged: {userRuns.length}</ProfileItem>
      <ProfileItem>Total distance logged: {total}km</ProfileItem>
    </PageSection>
  );
};

export default Profile;

const ProfileItem = styled.p`
  font-size: 2.2rem;
  line-height: 1.6;
  letter-spacing: -0.05rem;
  margin-bottom: 2.6rem;
`;