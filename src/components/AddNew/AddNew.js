import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../services/tokenService';
import moment from 'moment';

import AddEditForm from '../FormComponents/AddEditForm';

class AddNew extends Component {
  constructor() {
    super();
    this.state = {
      completed: true,
      distance: 0,
      title: '',
      elapsedHours: 0,
      elapsedMinutes: 0,
      elapsedSeconds: 0,
      runStart: new Date(),
      workoutType: 'Default',
      notes: '',
      tempInC: 10,
      weather: [
        { value: 'Sunny', isSelected: false },
        { value: 'Humid', isSelected: false },
        { value: 'Wind', isSelected: false },
        { value: 'Rain', isSelected: false },
        { value: 'Snow', isSelected: false },
      ],
      treadmill: false,
      effort: 3,
      rating: 3,
      racePosition: 0,
      raceFieldSize: 0,
      raceAgePosition: 0,
      raceAgeFieldSize: 0,
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
    if (date >= new Date()) this.setState({ completed: false });
    this.setState({ runStart: date });
  }

  handleTreadmillChange = () => {
      this.setState({
        treadmill: !this.state.treadmill
      });
  }

  handleCompletedChange = () => {
    if(this.state.runStart <= new Date()) {
      this.setState({
        completed: !this.state.completed
      });
    }
  }

  handleWeatherChange = (e) => {
    const weatherClicked = e.target.value;
    const weatherCopy = [...this.state.weather];
    const index = weatherCopy.findIndex(item => item.value === weatherClicked);
    weatherCopy[index].isSelected = !weatherCopy[index].isSelected;
    this.setState({
      weather: weatherCopy
    });
  }

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
      const weather = this.state.weather.filter(item => item.isSelected).map(item => item.value);
  
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
            notes: this.state.notes,
            completed: this.state.completed,
            weather: weather,
            tempInC: this.state.tempInC,
            effort: this.state.effort,
            rating: this.state.rating,
            treadmill: this.state.treadmill,
            racePosition: this.state.racePosition,
            raceFieldSize: this.state.raceFieldSize,
            raceAgePosition: this.state.raceAgePosition,
            raceAgeFieldSize: this.state.raceAgeFieldSize,
          }
        });
        console.log(`Created new run with id: ${res.data.data[0]._id}`);
        this.props.addRunToState(res.data.data[0]);
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
            handleTreadmillChange={this.handleTreadmillChange}
            handleCompletedChange={this.handleCompletedChange}
            handleWeatherChange={this.handleWeatherChange}
            updateErrorStatus={this.updateErrorStatus} 
            distance={this.state.distance}
            completed={this.state.completed}
            title={this.state.title}
            notes={this.state.notes}
            effort={this.state.effort}
            rating={this.state.rating}
            treadmill={this.state.treadmill}
            tempInC={this.state.tempInC}
            weather={this.state.weather}
            racePosition={this.state.racePosition}
            raceFieldSize={this.state.raceFieldSize}
            raceAgePosition={this.state.raceAgePosition}
            raceAgeFieldSize={this.state.raceAgeFieldSize}
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