import React from 'react';

import Button from '../Button/Button';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import DateTime from './DateTime';

import formStyles from './AddEditForm.module.scss';
import './DateTime.scss';

const AddEditForm = ({ handleSubmit, formTitle, updateErrorStatus, handleChange, handleTimeChange, distance, title, elapsedHours, elapsedMinutes, elapsedSeconds, runStart, workoutType, notes, setRedirect }) => {
  return (
    <form autoComplete='off' onSubmit={handleSubmit} className={formStyles.addEditForm}>
      <div className={formStyles.headlineBlock}>
        <h2>{formTitle}</h2>
        <p>Fields marked with a star are required</p>
      </div>

      <fieldset className={formStyles.distanceBlock}>
        <legend>Distance:</legend>
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
      </fieldset>

      <fieldset className={formStyles.durationBlock}>
        <legend>Run duration:</legend>
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
      </fieldset>

      <div className={formStyles.runTypeBlock}>
        <Select
          inputName='workoutType'
          inputValue={workoutType}
          labelText='Workout type:'
          optionsArray={['Default', 'Easy', 'Recovery', 'Hills', 'Tempo', 'Intervals', 'Long', 'Race']}
          updateErrorStatus={updateErrorStatus}
          changeHandler={handleChange} />
      </div>

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

      <div className={formStyles.dateTimeBlock}>
        <DateTime
          inputName='runDate'
          inputValue={runStart}
          labelText='Date & time:'
          changeHandler={handleTimeChange} />
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