import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import AddNew from './components/AddNew/AddNew';
import Home from './components/HomePageComponents/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import RunDetail from './components/RunDetail/RunDetail';
import EditRun from './components/EditRun/EditRun';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {},
      token: {},
      selectedRun: {},
    }
  }

  setUser = (token, user) => {
    this.setState({
      isLoggedIn: true,
      user,
      token
    });
  }

  setRun = (run) => {
    this.setState({
      selectedRun: run,
    });
  }

  logOut = (e) => {
    e.preventDefault();
    this.setState({
      isLoggedIn: false,
      user: {},
      token: {},
      selectedRun: {},
    });
  }

  render () {
    return (
      <Router>
        <Layout 
          logOut={this.logOut}
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} >
          <Switch>
            <Route path="/login">
              <Login setUser={this.setUser} user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
            </Route>
            <Route path="/signup">
              <Signup setUser={this.setUser} user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
            </Route>
            <PrivateRoute path="/users/:userId/runs/add" isLoggedIn={this.state.isLoggedIn}>
              <AddNew user={this.state.user} />
            </PrivateRoute>
            <PrivateRoute path="/users/:userId/runs/:runId/edit" isLoggedIn={this.state.isLoggedIn}>
              <EditRun user={this.state.user} run={this.state.selectedRun} setRun={this.setRun} />
            </PrivateRoute>
            <PrivateRoute path="/users/:userId/runs/:runId" isLoggedIn={this.state.isLoggedIn}>
              <RunDetail user={this.state.user} run={this.state.selectedRun} setRun={this.setRun} />
            </PrivateRoute>
            <PrivateRoute path="/users/:userId" isLoggedIn={this.state.isLoggedIn}>
              <Dashboard user={this.state.user} setRun={this.setRun} selectedRun={this.state.selectedRun} />
            </PrivateRoute>
            <Route exact path="/">
              <Home
                user={this.state.user}
                setUser={this.setUser}
                isLoggedIn={this.state.isLoggedIn} />
            </Route>
          </Switch>
        </Layout>
       </Router>
    );
  }
}

export default App;
