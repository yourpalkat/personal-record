import React from 'react';

import profileStyles from './Profile.module.scss';

const Profile = ({ user, userRuns }) => {
  const total = userRuns.reduce((acc, curr) => acc + curr.distance, 0).toFixed(2);
  return (
    <section className={profileStyles.profileSection}>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <p>Runs logged: {userRuns.length}</p>
      <p>Total distance logged: {total}km</p>
    </section>
  );
};

export default Profile;