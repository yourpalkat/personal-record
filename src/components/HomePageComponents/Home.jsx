import React from 'react';

import Hero from './Hero';
import SectionTwo from './SectionTwo';

const Home = ({ setUser, user, isLoggedIn }) => {
  return (
    <>
      <Hero
        setUser={setUser}
        user={user}
        isLoggedIn={isLoggedIn} />
      <SectionTwo />
    </>
  );
};

export default Home;
