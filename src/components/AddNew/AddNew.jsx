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
      errorStatus: {
        distance: false,
        elapsedHours: false,
        elapsedMinutes: false,
        elapsedSeconds: false,
      },
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
// update this to the new updateErrorStatus on login/signup - refactor for state
  // setErrorStatus = status => {
  //   this.setState({ errorStatus: status });
  // }
  updateErrorStatus = (key, value) => {
    const newStatus = this.state.errorStatus;
    newStatus[key] = value;
    this.setState({
      errorStatus: newStatus,
    });
  };

  setRedirect = status => {
    this.setState({ redirect: status });
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (Object.values(this.state.errorStatus).indexOf(true) === -1) {
      const runEnd = moment(this.state.runStart).add(this.state.elapsedHours, 'hours').add(this.state.elapsedMinutes, 'minutes').add(this.state.elapsedSeconds, 'seconds').toDate();
  
      let assignedTitle = '';
      if (!this.state.title) {
        assignedTitle = `${this.state.distance}K ${this.state.workoutType}`;
      } else {
        assignedTitle = this.state.title;
      }
  
      try {
        const newRun = {
          distance: this.state.distance,
          title: assignedTitle,
          start: this.state.runStart,
          end: runEnd,
          userId: this.props.user._id,
          workoutType: this.state.workoutType,
          notes: this.state.notes
        };
        const res = await axios.post(`/api/runs/new`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          },
          data: {
            distance: newRun.distance,
            title: newRun.title,
            start: newRun.start,
            end: newRun.end,
            userId: newRun.userId,
            workoutType: newRun.workoutType,
            notes: newRun.notes
          }
        });
        console.log(`Created new record: ${res}`);
        this.props.addRunToState(newRun);
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
          <AddEditForm 
            formTitle='Add new run'
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleTimeChange={this.handleTimeChange}
            updateErrorStatus={this.updateErrorStatus} 
            distance={this.state.distance}
            title={this.state.title}
            notes={this.state.notes}
            elapsedHours={this.state.elapsedHours}
            elapsedMinutes={this.state.elapsedMinutes}
            elapsedSeconds={this.state.elapsedSeconds}
            runStart={this.state.runStart}
            workoutType={this.state.workoutType}
            setRedirect={this.setRedirect} />
        )}
      </>
    );
  }
}

export default AddNew;