import React from 'react';

import Button from '../Button/Button';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import DateTime from './DateTime';

import formStyles from './AddEditForm.module.scss';
import './DateTime.scss';

const AddEditForm = ({ handleSubmit, formTitle, updateErrorStatus, handleChange, handleTimeChange, handleTreadmillChange, handleWeatherChange, distance, title, elapsedHours, elapsedMinutes, elapsedSeconds, runStart, workoutType, notes, tempInC, weather, treadmill, effort, rating, completed, racePosition, raceFieldSize, raceAgePosition, raceAgeFieldSize, setRedirect }) => {
  return (
    <form autoComplete='off' onSubmit={handleSubmit} className={formStyles.addEditForm}>
      <div className={formStyles.headlineBlock}>
        <h2>{formTitle}</h2>
        <p>Fields marked with a star are required</p>
      </div>

      <div className={`${formStyles.inputGroup} ${formStyles.distanceBlock}`} role='group' aria-labelledby='distlabel'>
        <p className={formStyles.legend} id='distlabel'>Distance:</p>
        <Input
          inputName='distance'
          inputType='number'
          inputValue={distance}
          labelText='km'
          inputPlaceholder='0'
          isRequired
          min={0}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
      </div>

      <div className={`${formStyles.inputGroup} ${formStyles.durationBlock}`} role='group' aria-labelledby='durlabel'>
        <p className={formStyles.legend} id='durlabel'>Run duration:</p>
        <Input
          inputName='elapsedHours'
          inputType='number'
          inputValue={elapsedHours}
          labelText='hour'
          inputPlaceholder='0'
          isRequired
          min={0}
          max={12}
          step={1}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
        <Input
          inputName='elapsedMinutes'
          inputType='number'
          inputValue={elapsedMinutes}
          labelText='mins'
          inputPlaceholder='0'
          isRequired
          min={0}
          max={59}
          step={1}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
        <Input
          inputName='elapsedSeconds'
          inputType='number'
          inputValue={elapsedSeconds}
          labelText='secs'
          inputPlaceholder='0'
          isRequired
          min={0}
          max={59}
          step={1}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
      </div>

      <div className={formStyles.runTypeBlock}>
        <Select
          inputName='workoutType'
          inputValue={workoutType}
          labelText='Workout type:'
          optionsArray={['Default', 'Easy', 'Recovery', 'Hills', 'Tempo', 'Intervals', 'Long', 'Race']}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
      </div>

      {workoutType === 'Race' && (
        <div className={`${formStyles.inputGroup} ${formStyles.raceBlock}`} role='group' aria-labelledby='racelabel'>
          <p className={formStyles.legend} id='racelabel'>Race finish position:</p>
          <div>
            <Input
              inputName='racePosition'
              inputType='number'
              inputValue={racePosition}
              labelText='Overall:'
              inputPlaceholder='1'
              step={1}
              updateErrorStatus={updateErrorStatus}
              changeHandler={handleChange} />
            <Input
              inputName='raceFieldSize'
              inputType='number'
              inputValue={raceFieldSize}
              labelText='Out of:'
              inputPlaceholder='1'
              step={1}
              updateErrorStatus={updateErrorStatus}
              changeHandler={handleChange} />
          </div>
          <div>
            <Input
              inputName='raceAgePosition'
              inputType='number'
              inputValue={raceAgePosition}
              labelText='AG:'
              inputPlaceholder='1'
              step={1}
              updateErrorStatus={updateErrorStatus}
              changeHandler={handleChange} />
            <Input
              inputName='raceAgeFieldSize'
              inputType='number'
              inputValue={raceAgeFieldSize}
              labelText='Out of:'
              inputPlaceholder='1'
              step={1}
              updateErrorStatus={updateErrorStatus}
              changeHandler={handleChange} />
          </div>
        </div>
      )}

      <div className={formStyles.titleBlock}>
        <Input
          inputName='title'
          inputType='text'
          inputValue={title}
          labelText='Workout name:'
          inputPlaceholder={`${distance}km ${workoutType}`}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
      </div>

      <div className={formStyles.treadmillBlock}>
        <label for="treadmill">Treadmill?</label>
        <input type="checkbox" id="treadmill" name="treadmill" value='true' onChange={handleTreadmillChange} />
      </div>

      <div className={formStyles.dateTimeBlock}>
        <DateTime
          inputName='runDate'
          inputValue={runStart}
          labelText='Date & time:'
          changeHandler={handleTimeChange} />
      </div>

      <div className={formStyles.effortBlock}>
        <Input
          inputName='effort'
          inputType='range'
          inputValue={effort}
          labelText='Effort'
          min={1}
          max={5}
          step={1}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
      </div>
      <div className={formStyles.ratingBlock}>
        <Input
          inputName='rating'
          inputType='range'
          inputValue={rating}
          labelText='Rating'
          min={1}
          max={5}
          step={1}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
      </div>

      <div className={formStyles.weatherBlock}>
        <Input
          inputName='tempInC'
          inputType='number'
          inputValue={tempInC}
          labelText='Temperature (C):'
          inputPlaceholder='10'
          step={1}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
        
        <div className={formStyles.weather} role='group' aria-labelledby='weather'>
          <p className={formStyles.legend} id='weather'>Weather:</p>
          <div className={formStyles.weatherCheckbox}>
            <input type="checkbox" id="weatherSun" name="weather" value="Sunny" onClick={handleWeatherChange} />
            <label for="weatherSun">Sunny</label>
          </div>
          <div className={formStyles.weatherCheckbox}>
            <input type="checkbox" id="weatherHumid" name="weather" value="Humid" onClick={handleWeatherChange} />
            <label for="weatherHumid">Humid</label>
          </div>
          <div className={formStyles.weatherCheckbox}>
            <input type="checkbox" id="weatherWind" name="weather" value="Wind" onClick={handleWeatherChange} />
            <label for="weatherWind">Wind</label>
          </div>
          <div className={formStyles.weatherCheckbox}>
            <input type="checkbox" id="weatherRain" name="weather" value="Rain" onClick={handleWeatherChange} />
            <label for="weatherRain">Rain</label>
          </div>
          <div className={formStyles.weatherCheckbox}>
            <input type="checkbox" id="weatherSnow" name="weather" value="Snow" onClick={handleWeatherChange} />
            <label for="weatherSnow">Snow</label>
          </div>
        </div>
      </div>

      <div className={formStyles.notesBlock}>
        <Textarea
          inputName='notes'
          inputValue={notes}
          labelText='Notes:'
          inputPlaceholder='Add notes here. What was the workout? How did it go?'
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
      </div>

      <div className={formStyles.buttonBlock}>
        <Button
          buttonType='button'
          buttonStyle='ghost'
          text='Cancel'
          eventHandler={() => setRedirect(true)} />
        <Button
          buttonType='submit'
          buttonStyle='confirm'
          text='Save run'
          eventHandler={handleSubmit} />
      </div>
    </form>
  );
;}

export default AddEditForm;