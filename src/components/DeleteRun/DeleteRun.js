import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Button/Button';

const Delete = ({ toggle, setRun, run, removeRun }) => {
  const isMountedRef = useRef(null);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/runs/delete/${run._id}`);
      console.log(`Deleted run. ${res}`);
      if (isMountedRef.current) {
        removeRun(run);
        setRun({});
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
  border: 1px solid var(--color-white);
  border-radius: 4px;
  background-color: var(--color-background);
  color: var(--color-white);
  padding: 2rem;

  p {
    margin-bottom: 3rem;
  }

  button:last-of-type {
    margin-left: 2rem;
  }
`;