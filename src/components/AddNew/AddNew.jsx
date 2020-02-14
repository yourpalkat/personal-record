import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../services/tokenService';
import moment from 'moment';

import AddEditForm from '../FormComponents/AddEditForm';

// import addStyles from './AddNew.module.scss';

class AddNew extends Component {
  constructor() {
    super();
    this.state = {
      distance: 0,
      title: '',
      elapsedHours: 0,
      elapsedMinutes: 0,
      elapsedSeconds: 0,
      runStart: new Date(),
      workoutType: 'Default',
      notes: '',
      message: '',
      redirect: false,
      errorStatus: false,
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTimeChange = date => {
    this.setState({ runStart: date });
  }

  setErrorStatus = status => {
    this.setState({ errorStatus: status });
  }

  setRedirect = status => {
    this.setState({ redirect: status });
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.state.errorStatus) {
      const runEnd = moment(this.state.runStart).add(this.state.elapsedHours, 'hours').add(this.state.elapsedMinutes, 'minutes').add(this.state.elapsedSeconds, 'seconds').toDate();
  
      let assignedTitle = '';
      if (!this.state.title) {
        assignedTitle = `${this.state.distance}K ${this.state.workoutType}`;
      } else {
        assignedTitle = this.state.title;
      }
  
      try {
        const res = await axios.post(`/api/runs/new`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          },
          data: {
            distance: this.state.distance,
            title: assignedTitle,
            start: this.state.runStart,
            end: runEnd,
            userId: this.props.user._id,
            workoutType: this.state.workoutType,
            notes: this.state.notes
          }
        });
        console.log(`Created new record: ${res}`);
        this.setState({ redirect: true });
      } catch (e) {
        this.setState({ message: e });
        console.log(this.state.message);
      }
    }
  }

  render() {
    return (
      <>
        {this.state.redirect ? (
          <Redirect to={`/users/${this.props.user._id}`} />
        ) : (
          <div className='gridWrapper'>
            <AddEditForm 
              formTitle='Add new run'
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleTimeChange={this.handleTimeChange}
              setErrorStatus={this.setErrorStatus} 
              distance={this.state.distance}
              title={this.state.title}
              notes={this.state.notes}
              elapsedHours={this.state.elapsedHours}
              elapsedMinutes={this.state.elapsedMinutes}
              elapsedSeconds={this.state.elapsedSeconds}
              runStart={this.state.runStart}
              workoutType={this.state.workoutType}
              setRedirect={this.setRedirect} />
          </div>
        )}
      </>
    );
  }
}

export default AddNew;