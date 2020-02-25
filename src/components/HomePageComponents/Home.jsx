import React from 'react';

import Hero from './Hero';
import SectionTwo from './SectionTwo';

const Home = ({ setUser, setUserRuns, user, isLoggedIn }) => {
  return (
    <>
      <Hero
        setUser={setUser}
        setUserRuns={setUserRuns}
        user={user}
        isLoggedIn={isLoggedIn} />
      <SectionTwo />
    </>
  );
};

export default Home;
