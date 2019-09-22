import React, { Component } from 'react';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userId: '',
      firstName: ''
    }
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <p>
            It's a website
          </p>
          {!this.state.isLoggedIn ? <Login /> : <Dashboard userId={this.state.userId} userName={this.state.firstName} />}
        </header>
      </div>
    );
  }
}

export default App;
