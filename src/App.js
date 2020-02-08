import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import AddNew from './components/AddNew/AddNew';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
// import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {},
      token: {}
    }
  }

  setUser = (token, user) => {
    this.setState({
      isLoggedIn: true,
      user,
      token
    });
  }

  logOut = (e) => {
    e.preventDefault();
    this.setState({
      isLoggedIn: false,
      user: {},
      token: {}
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
            <PrivateRoute path="/users/:userId" isLoggedIn={this.state.isLoggedIn}>
              <Dashboard user={this.state.user} />
            </PrivateRoute>
            <PrivateRoute path="/users/:userId/runs/add" isLoggedIn={this.state.isLoggedIn}>
              <AddNew user={this.state.user} />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
       </Router>
    );
  }
}

export default App;
