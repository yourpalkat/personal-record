import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { getToken } from '../../services/tokenService';
import moment from 'moment';

import Button from '../Button/Button';

import addStyles from './AddNew.module.scss';

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

  handleSubmit = async e => {
    e.preventDefault();
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

  render() {
    return (
      <>
        {this.state.redirect ? (
          <Redirect to={`/users/${this.props.user._id}`} />
        ) : (
          <div className='gridWrapper'>
            <form autoComplete='off' onSubmit={this.handleSubmit} className={addStyles.addForm}>
              <h4>New Run</h4>
              <label htmlFor='distance'>Distance (km)</label>
              <input name='distance' id='distance' type='number' placeholder='0' min='0' step='0.1' onChange={this.handleChange} value={this.state.distance} required />

              <label htmlFor='title'>Workout name</label>
              <input name='title' id='title' type='text' placeholder={`${this.state.distance}km ${this.state.workoutType}`} value={this.state.title}   onChange={this.handleChange} />
    
              <label htmlFor='elapsedHours'>Hours</label>
              <input name='elapsedHours' id='elapsedHours' type='number' placeholder='0' min='0' max='12' onChange={this.handleChange} value={this.state.elapsedHours} />
              <label htmlFor='elapsedMinutes'>Minutes</label>
              <input name='elapsedMinutes' id='elapsedMinutes' type='number' placeholder='0' min='0' max='59' onChange={this.handleChange} value={this.state.elapsedMinutes} />
              <label htmlFor='elapsedSeconds'>Seconds</label>
              <input name='elapsedSeconds' id='elapsedSeconds' type='number' placeholder='0' min='0' max='59' onChange={this.handleChange} value={this.state.elapsedSeconds} />
    
              <label htmlFor='runDate'>Date &amp; time</label>
              <DateTimePicker name='runDate' id='runDate' onChange={this.handleTimeChange} value={this.state.runStart} />
    
              <label htmlFor='workoutType'>Workout type</label>
              <select name='workoutType' id='workoutType' onChange={this.handleChange} >
                <option value='Default'>Default</option>
                <option value='Easy'>Easy</option>
                <option value='Recovery'>Recovery</option>
                <option value='Hills'>Hills</option>
                <option value='Tempo'>Tempo</option>
                <option value='Intervals'>Intervals</option>
                <option value='Long'>Long</option>
                <option value='Race'>Race</option>
              </select>
    
              <label htmlFor='notes'>Notes</label>
              <textarea name='notes' id='notes' onChange={this.handleChange} />

              <div className={addStyles.buttonContainer}>
                <Button 
                  buttonType='button'
                  buttonStyle='ghost'
                  text='Cancel'
                  eventHandler={() => this.setState({ redirect: true })} />
                <Button
                  buttonType='button'
                  buttonStyle='confirm'
                  text='Add run'
                  eventHandler={this.handleSubmit} />
              </div>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default AddNew;