import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import UserHome from './components/UserHome/UserHome';
import Home from './components/HomePageComponents/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import './App.scss';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute path="/users/:userId">
            <UserHome />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
