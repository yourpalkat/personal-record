import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedRun, removeRun } from '../../redux/actions';

import styled from 'styled-components';
import Button from '../Button/Button';
import { colors } from '../../elements';

const Delete = ({ toggle, run }) => {
  const isMountedRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/runs/delete/${run._id}`);
      console.log(`Deleted run. ${res}`);
      if (isMountedRef.current) {
        dispatch(removeRun(run));
        dispatch(setSelectedRun({}));
        toggle();
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    // set flag that component is mounted and thus async functions can run
    isMountedRef.current = true;
    // return a function to set mounted flag to false, so async functions won't run
    return () => isMountedRef.current = false;
  }, []);

  return (
    <ModalInner>
      <h4>Are you sure you want to delete this run?</h4>
      <p>This cannot be undone.</p>
      <Button 
        buttonType='button'
        buttonStyle='ghost'
        text='Cancel'
        eventHandler={toggle} />
      <Button 
        buttonType='button'
        buttonStyle='danger'
        text='Yes, delete'
        eventHandler={handleDelete} />
    </ModalInner>
  );
}

export default Delete;

const ModalInner = styled.div`
  border: 1px solid ${colors.white};
  border-radius: 4px;
  background-color: ${colors.background};
  color: ${colors.white};
  padding: 2rem;

  p {
    margin-bottom: 3rem;
  }

  button:last-of-type {
    margin-left: 2rem;
  }
`;