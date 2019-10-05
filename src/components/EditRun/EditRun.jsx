import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { getToken } from '../../services/tokenService';

import '../AddNew/AddNew.css';

class EditRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runId: this.props.run._id,
      userId: this.props.run.userId,
      distance: this.props.run.distance,
      elapsedTime: this.props.run.elapsedTime,
      date: this.props.run.date,
      workoutType: this.props.run.workoutType,
      notes: this.props.run.notes,
      message: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTimeChange = date => {
    this.setState({ date: date });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/runs/edit`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'runId': this.state.runId
        },
        data: {
          distance: this.state.distance,
          elapsedTime: this.state.elapsedTime,
          date: this.state.date,
          userId: this.state.userId,
          workoutType: this.state.workoutType,
          notes: this.state.notes
        }
      });

      const newRun = {
        distance: this.state.distance,
        elapsedTime: this.state.elapsedTime,
        date: this.state.date,
        userId: this.state.userId,
        workoutType: this.state.workoutType,
        notes: this.state.notes
      }
      this.props.updateDisplay(newRun);

      console.log(`Edited record: ${res}`);
      this.props.setShowEdit(false);
    } catch (e) {
      this.setState({ message: e });
      console.log(this.state.message);
    }
  }

  render() {
    return (
      <div className='add-new-modal'>
        <div className='add-new-wrapper'>
          <h4>Edit Run</h4>
          <form autoComplete='off' onSubmit={this.handleSubmit}>
            <input name='distance' id='distance' type='text' placeholder='distance' onChange={this.handleChange} value={this.state.distance} />
            <label htmlFor='distance'>Distance (km)</label>

            <input name='elapsedTime' id='elapsedTime' type='text' placeholder='elapsed time' onChange={this.handleChange} value={this.state.elapsedTime} />
            <label htmlFor='elapsedTime'>Elapsed time</label>

            <DateTimePicker name='runDate' id='runDate' onChange={this.handleTimeChange} value={this.state.date} />
            <label htmlFor='runDate'>Date &amp; time</label>

            <select name='workoutType' id='workoutType' onChange={this.handleChange} value={this.state.workoutType}>
              <option value='Default'>Default</option>
              <option value='Easy'>Easy</option>
              <option value='Hills'>Hills</option>
              <option value='Tempo'>Tempo</option>
              <option value='Intervals'>Intervals</option>
              <option value='Long'>Long</option>
            </select>
            <label htmlFor='workoutType'>Workout type</label>

            <textarea name='notes' id='notes' onChange={this.handleChange} value={this.state.notes} />
            <label htmlFor='notes'>Notes</label>

            <button className='cancel' onClick={() => this.props.setShowEdit(false)}>Cancel</button>
            <button className='submit' type='submit' onClick={this.handleSubmit}>Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditRun;