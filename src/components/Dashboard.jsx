import React from 'react';

const Dashboard = (props) => {
  const userName = props.firstName;
  return(
    <div>
      Hello, {userName}
    </div>
  );
}

export default Dashboard;