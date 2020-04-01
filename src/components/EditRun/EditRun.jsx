import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../services/tokenService';
import moment from 'moment';

import AddEditForm from '../FormComponents/AddEditForm';

// import editStyles from './EditRun.module.scss';

class EditRun extends Component {
  constructor(props) {
    super(props);
    const start = moment(this.props.run.start);
    const end = moment(this.props.run.end);
    const totalInSeconds = Math.floor(end.diff(start, 'seconds'));
    const elapsedHours = Math.floor(totalInSeconds / 3600);
    const elapsedMinutes = Math.floor((totalInSeconds % 3600) / 60);
    const elapsedSeconds = Math.floor(totalInSeconds % 60);
    const startDate = moment(this.props.run.start).toDate();
    const endDate = moment(this.props.run.end).toDate();
    const weatherFromDb = [
      { value: 'Sunny', isSelected: false },
      { value: 'Humid', isSelected: false },
      { value: 'Wind', isSelected: false },
      { value: 'Rain', isSelected: false },
      { value: 'Snow', isSelected: false },
    ];
    this.props.run.weather.forEach(weatherFromProps => {
      const index = weatherFromDb.findIndex(item => item.value === weatherFromProps);
      weatherFromDb[index].isSelected = true;
    });

    this.state = {
      runId: this.props.run._id,
      userId: this.props.run.userId,
      title: this.props.run.title,
      distance: this.props.run.distance,
      runStart: startDate,
      end: endDate,
      elapsedHours,
      elapsedMinutes,
      elapsedSeconds,
      workoutType: this.props.run.workoutType,
      notes: this.props.run.notes,
      tempInC: this.props.run.tempInC,
      weather: weatherFromDb,
      treadmill: this.props.run.treadmill,
      effort: this.props.run.effort,
      rating: this.props.run.rating,
      racePosition: this.props.run.racePosition,
      raceFieldSize: this.props.run.raceFieldSize,
      raceAgePosition: this.props.run.raceAgePosition,
      raceAgeFieldSize: this.props.run.raceAgeFieldSize,
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

  updateErrorStatus = (key, value) => {
    const newStatus = this.state.errorStatus;
    newStatus[key] = value;
    this.setState({
      errorStatus: newStatus,
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTimeChange = date => {
    this.setState({ runStart: date });
  }

  handleTreadmillChange = () => {
    const newValue = !this.state.treadmill;
    this.setState({
      treadmill: newValue
    });
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
      const newRun = {
        _id: this.props.run._id,
        distance: this.state.distance,
        title: assignedTitle,
        start: this.state.runStart,
        end: runEnd,
        userId: this.state.userId,
        workoutType: this.state.workoutType,
        notes: this.state.notes,
        weather: weather,
        tempInC: this.state.tempInC,
        effort: this.state.effort,
        rating: this.state.rating,
        treadmill: this.state.treadmill,
        racePosition: this.state.racePosition,
        raceFieldSize: this.state.raceFieldSize,
        raceAgePosition: this.state.raceAgePosition,
        raceAgeFieldSize: this.state.raceAgeFieldSize,
      };

      try {

        const res = await axios.post(`/api/runs/edit`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'runId': this.state.runId
          },
          data: {
            runId: newRun._id,
            distance: newRun.distance,
            title: newRun.title,
            start: newRun.start,
            end: newRun.end,
            userId: newRun.userId,
            workoutType: newRun.workoutType,
            notes: newRun.notes,
            weather: newRun.weather,
            tempInC: newRun.tempInC,
            effort: newRun.effort,
            rating: newRun.rating,
            treadmill: newRun.treadmill,
            racePosition: newRun.racePosition,
            raceFieldSize: newRun.raceFieldSize,
            raceAgePosition: newRun.raceAgePosition,
            raceAgeFieldSize: newRun.raceAgeFieldSize,
          }
        });
        this.props.replaceEditedRun(newRun);
        this.props.setRun(newRun);
        console.log(`Edited record: ${res}`);
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
            formTitle='Edit run'
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleTimeChange={this.handleTimeChange}
            handleTreadmillChange={this.handleTreadmillChange}
            handleWeatherChange={this.handleWeatherChange}
            updateErrorStatus={this.updateErrorStatus}
            distance={this.state.distance}
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

export default EditRun;