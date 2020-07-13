import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Profile = () => {
  const user = useSelector(state => state.user);
  const userRuns = useSelector(state => state.userRuns);
  const total = userRuns.reduce((acc, curr) => acc + curr.distance, 0).toFixed(2);
  
  return (
    <ProfileSection>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <p>Runs logged: {userRuns.length}</p>
      <p>Total distance logged: {total}km</p>
    </ProfileSection>
  );
};

export default Profile;

const ProfileSection = styled.section`
  grid-column: 2 / -2;
  color: var(--color-white);
  padding: 4rem 0;

  h2 {
    border-bottom: 2px solid var(--color-primary);
    margin-bottom: 4rem;
  }

  p {
    font-size: 2.2rem;
    line-height: 1.6;
    letter-spacing: -0.05rem;
    margin-bottom: 2.6rem;
  }
`;