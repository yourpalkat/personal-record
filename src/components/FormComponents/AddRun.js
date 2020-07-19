import React from 'react';
import { useForm, appendErrors } from 'react-hook-form';

import { PageSection, TitleBlock } from '../../elements/Layouts';
import { 
  AddForm, 
  Asterisk, 
  InputContainer, 
  InputSubhead, 
  InputLabel, 
  TextInput, 
  NumberInput, 
  NumberBlock,
  InputSelect,
  InputOption, 
  ErrorText } from '../../elements/FormElements';

const Star = () => {
  return <Asterisk>*</Asterisk>;
}

const AddRun = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return(
    <PageSection>
      <TitleBlock>
        <h2>Add new run</h2>
        <p>Fields marked with a star <Star /> are required.</p>
      </TitleBlock>

      <AddForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer role='group' aria-labelledby='distlabel'>
          <InputSubhead id='distLabel'>Distance: <Star /></InputSubhead>
          <NumberInput name='distance' id='distance' ref={register({ required: true })} />
          <InputLabel htmlFor='distance'>km</InputLabel>
          { errors.distance && <ErrorText>Distance is required.</ErrorText>}
        </InputContainer>

        <InputContainer role='group' aria-labelledby='durLabel'>
          <InputSubhead id='durLabel'>Duration: <Star /></InputSubhead>
          <NumberBlock>
            <InputContainer>
              <NumberInput name='hour' id='hour' defaultValue={0} ref={register({ required: true, min: 0, max: 12})} />
              <InputLabel htmlFor='hour'>hh</InputLabel>
            </InputContainer>
            <InputContainer>
              <NumberInput name='mins' id='mins' defaultValue={0} ref={register({ required: true, min: 0, max: 59})} />
              <InputLabel htmlFor='mins'>mm</InputLabel>
            </InputContainer>
            <InputContainer>
              <NumberInput name='secs' id='secs' defaultValue={0} ref={register({ required: true, min: 0, max: 59})} />
              <InputLabel htmlFor='secs'>ss</InputLabel>
            </InputContainer>
          </NumberBlock>
          { errors.hour || errors.mins || errors.secs && <ErrorText>Duration is required.</ErrorText>}
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor='workoutType'>Workout type:</InputLabel>
          <InputSelect name='workoutType' id='workoutType' defaultValue='Default' ref={register}>
            <InputOption value='Default'>Default</InputOption>
            <InputOption value='Easy'>Easy</InputOption>
            <InputOption value='Recovery'>Recovery</InputOption>
            <InputOption value='Hills'>Hills</InputOption>
            <InputOption value='Tempo'>Tempo</InputOption>
            <InputOption value='Intervals'>Intervals</InputOption>
            <InputOption value='Long'>Long</InputOption>
            <InputOption value='Race'>Race</InputOption>
          </InputSelect>
        </InputContainer>
      </AddForm>
    </PageSection>
  );
}

export default AddRun;