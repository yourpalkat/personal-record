import React from 'react';

import Button from '../Button/Button';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import DateTime from './DateTime';

import formStyles from './AddEditForm.module.scss';

const AddEditForm = ({ handleSubmit, formTitle, setErrorStatus, handleChange, handleTimeChange, distance, title, elapsedHours, elapsedMinutes, elapsedSeconds, runStart, workoutType, notes, setRedirect }) => {
  return (
    <form autoComplete='off' onSubmit={handleSubmit} className={formStyles.addEditForm}>
      <h4>{formTitle}</h4>
      <Input
        inputName='distance'
        inputType='number'
        inputValue={distance}
        labelText='Distance (km):'
        inputPlaceholder='0'
        isRequired
        min={0}
        setErrorStatus={setErrorStatus}
        changeHandler={handleChange} />
      <Input
        inputName='title'
        inputType='text'
        inputValue={title}
        labelText='Workout name:'
        inputPlaceholder={`${distance}km ${workoutType}`}
        setErrorStatus={setErrorStatus}
        changeHandler={handleChange} />
      <Input
        inputName='elapsedHours'
        inputType='number'
        inputValue={elapsedHours}
        labelText='Hours:'
        inputPlaceholder='0'
        isRequired
        min={0}
        max={12}
        setErrorStatus={setErrorStatus}
        changeHandler={handleChange} />
      <Input
        inputName='elapsedMinutes'
        inputType='number'
        inputValue={elapsedMinutes}
        labelText='Minutes:'
        inputPlaceholder='0'
        isRequired
        min={0}
        max={59}
        setErrorStatus={setErrorStatus}
        changeHandler={handleChange} />
      <Input
        inputName='elapsedSeconds'
        inputType='number'
        inputValue={elapsedSeconds}
        labelText='Seconds:'
        inputPlaceholder='0'
        isRequired
        min={0}
        max={59}
        setErrorStatus={setErrorStatus}
        changeHandler={handleChange} />
      <DateTime
        inputName='runDate'
        inputValue={runStart}
        labelText='Date & time:'
        changeHandler={handleTimeChange} />
      <Select
        inputName='workoutType'
        inputValue={workoutType}
        labelText='Workout type:'
        optionsArray={['Default', 'Easy', 'Recovery', 'Hills', 'Tempo', 'Intervals', 'Long', 'Race']}
        setErrorStatus={setErrorStatus}
        changeHandler={handleChange} />
      <Textarea
        inputName='notes'
        inputValue={notes}
        labelText='Notes:'
        inputPlaceholder='Add notes here. What was the workout? How did it go?'
        setErrorStatus={setErrorStatus}
        changeHandler={handleChange} />

      <div className={formStyles.buttonContainer}>
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