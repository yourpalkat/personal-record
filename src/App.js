import React, { Component } from 'react';
import LoginWrapper from './components/Login/LoginWrapper';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      showLogin: true,
      userId: '',
      firstName: '',
      token: {}
    }
  }

  hideLogin = () => {
    this.setState({
      showLogin: false
    });
  }

  showLogin = () => {
    this.setState({
      showLogin: true
    });
  }

  setUser = (token, userId, firstName) => {
    this.setState({
      isLoggedIn: true,
      showLogin: false,
      userId,
      firstName,
      token
    });
  }

  logOut = (e) => {
    e.preventDefault();
    this.setState({
      isLoggedIn: false,
      showLogin: true,
      firstName: '',
      userId: '',
      token: {}
    });
  }

  render () {
    return (
      <div className='app'>
        {this.state.showLogin && <LoginWrapper hideLogin={this.hideLogin} setUser={this.setUser} />}
        <Header isLoggedIn={this.state.isLoggedIn} firstName={this.state.firstName} logOut={this.logOut} showLogin={this.showLogin} />
        <main>
          <div className='wrapper'>
            {this.state.isLoggedIn && <Dashboard userId={this.state.userId} userName={this.state.firstName} />}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
