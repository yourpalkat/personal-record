import React, { Component } from 'react';
import LoginWrapper from './components/LoginWrapper';
import Dashboard from './components/Dashboard';
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
    })
  }

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
      showLogin: true,
      firstName: '',
      userId: '',
      token: {}
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <p>
            It's a website
          </p>
          {this.state.showLogin && <LoginWrapper hideLogin={this.hideLogin} setUser={this.setUser} />}
          
          {this.state.isLoggedIn && <Dashboard userId={this.state.userId} userName={this.state.firstName} logOut={this.logOut} />}
        </header>
      </div>
    );
  }
}

export default App;
