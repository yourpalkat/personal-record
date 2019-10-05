import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { getToken } from '../../services/tokenService';

import './AddNew.css';

class AddNew extends Component {
  constructor() {
    super();
    this.state = {
      distance: 0,
      elapsedTime: 0,
      runDate: new Date(),
      workoutType: 'Default',
      notes: '',
      message: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTimeChange = date => {
    this.setState({ runDate: date });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/runs/new`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        data: {
          distance: this.state.distance,
          elapsedTime: this.state.elapsedTime,
          date: this.state.runDate,
          userId: this.props.userId,
          workoutType: this.state.workoutType,
          notes: this.state.notes
        }
      });
      console.log(`Created new record: ${res}`);
      this.props.setShowAddNew(false);
    } catch (e) {
      this.setState({ message: e });
      console.log(this.state.message);
    }
  }

  render() {
    return (
      <div className='add-new-modal'>
        <div className='add-new-wrapper'>
          <h4>New Run</h4>
          <form autoComplete='off' onSubmit={this.handleSubmit}>
            <input name='distance' id='distance' type='text' placeholder='distance' onChange={this.handleChange} />
            <label htmlFor='distance'>Distance (km)</label>
  
            <input name='elapsedTime' id='elapsedTime' type='text' placeholder='elapsed time' onChange={this.handleChange} />
            <label htmlFor='elapsedTime'>Elapsed time</label>
  
            <DateTimePicker name='runDate' id='runDate' onChange={this.handleTimeChange} value={this.state.runDate} />
            <label htmlFor='runDate'>Date &amp; time</label>
  
            <select name='workoutType' id='workoutType' onChange={this.handleChange}>
              <option value='Default'>Default</option>
              <option value='Easy'>Easy</option>
              <option value='Hills'>Hills</option>
              <option value='Tempo'>Tempo</option>
              <option value='Intervals'>Intervals</option>
              <option value='Long'>Long</option>
            </select>
            <label htmlFor='workoutType'>Workout type</label>
  
            <textarea name='notes' id='notes' onChange={this.handleChange} />
            <label htmlFor='notes'>Notes</label>
  
            <button className='cancel' onClick={() => this.props.setShowAddNew(false)}>Cancel</button>
            <button className='submit' type='submit' onClick={this.handleSubmit}>Add run</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddNew;