import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
// import LoginWrapper from './components/Login/LoginWrapper';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
// import Header from './components/Header/Header';
// import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userId: '',
      firstName: '',
      token: {}
    }
  }

  // hideLogin = () => {
  //   this.setState({
  //     showLogin: false
  //   });
  // }

  // showLogin = () => {
  //   this.setState({
  //     showLogin: true
  //   });
  // }

  setUser = (token, userId, firstName) => {
    this.setState({
      isLoggedIn: true,
      userId,
      firstName,
      token
    });
  }

  logOut = (e) => {
    e.preventDefault();
    this.setState({
      isLoggedIn: false,
      firstName: '',
      userId: '',
      token: {}
    });
  }

  render () {
    return (
      <Router>
        <Layout 
          logOut={this.logOut}
          isLoggedIn={this.state.isLoggedIn}
          firstName={this.state.firstName} >
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login setUser={this.setUser} />
            </Route>
            <Route path="/user/:userId">
                <Dashboard userId={this.state.userId} userName={this.state.firstName} />
            </Route>
          </Switch>
        </Layout>
       </Router>
    );
  }
}

export default App;
