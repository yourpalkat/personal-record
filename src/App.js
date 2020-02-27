import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import UserHome from './components/UserHome/UserHome';
import Home from './components/HomePageComponents/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {},
      token: {},
      userRuns: [],
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

  setUserRuns = (runs) => {
    this.setState({ userRuns: runs });
  }

  setRun = (run) => {
    this.setState({
      selectedRun: run,
    });
  }

  addRunToState = (run) => {
    const allRuns = this.state.userRuns;
    allRuns.push(run);
    this.setState({ userRuns: allRuns });
  }
  
  removeRunFromState = (runToRemove) => {
    const allRuns = [...this.state.userRuns];
    const index = allRuns.findIndex(run => run._id === runToRemove._id);
    if (index !== -1) {
      allRuns.splice(index, 1);
      this.setState({ userRuns: allRuns });
    }
  }

  replaceEditedRun = (newRun) => {
    const allRuns = [...this.state.userRuns];
    const index = allRuns.findIndex(run => run._id === newRun._id);
    if (index !== -1) {
      allRuns[index] = {...newRun};
      this.setState({ userRuns: allRuns });
    }
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
              <Login setUser={this.setUser} setUserRuns={this.setUserRuns} user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
            </Route>
            <Route path="/signup">
              <Signup setUser={this.setUser} setUserRuns={this.setUserRuns} user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
            </Route>
            <PrivateRoute path="/users/:userId" isLoggedIn={this.state.isLoggedIn}>
              <UserHome 
                user={this.state.user} 
                userRuns={this.state.userRuns} 
                setRun={this.setRun} 
                selectedRun={this.state.selectedRun} 
                addRunToState={this.addRunToState}
                removeRunFromState={this.removeRunFromState}
                replaceEditedRun={this.replaceEditedRun} />
            </PrivateRoute>
            <Route exact path="/">
              <Home
                user={this.state.user}
                setUser={this.setUser}
                setUserRuns={this.setUserRuns}
                isLoggedIn={this.state.isLoggedIn} />
            </Route>
          </Switch>
        </Layout>
       </Router>
    );
  }
}

export default App;
