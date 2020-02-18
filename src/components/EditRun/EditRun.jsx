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
      message: '',
      redirect: false,
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
        const res = await axios.post(`/api/runs/edit`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'runId': this.state.runId
          },
          data: {
            distance: this.state.distance,
            title: assignedTitle,
            start: this.state.runStart,
            end: runEnd,
            userId: this.state.userId,
            workoutType: this.state.workoutType,
            notes: this.state.notes
          }
        });

        const newRun = {
          distance: this.state.distance,
          title: assignedTitle,
          start: this.state.runStart,
          end: runEnd,
          userId: this.state.userId,
          workoutType: this.state.workoutType,
          notes: this.state.notes
        }
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
        <div className='gridWrapper'>
          <AddEditForm
            formTitle='Edit run'
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

export default EditRun;