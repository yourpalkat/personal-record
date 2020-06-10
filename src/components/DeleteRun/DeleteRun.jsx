import React, { useRef, useEffect } from 'react';
import axios from 'axios';

import Button from '../Button/Button';

import deleteStyles from './DeleteRun.module.scss';

const Delete = ({ closeModal, setRun, run, removeRun }) => {
  const isMountedRef = useRef(null);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/runs/delete/${run._id}`);
      console.log(`Deleted run. ${res}`);
      if (isMountedRef.current) {
        removeRun(run);
        setRun({});
        closeModal();
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
    <div className={deleteStyles.modalOuter}>
      <div className={deleteStyles.modalInner}>
        <h4>Are you sure you want to delete this run?</h4>
        <p>This cannot be undone.</p>
        <Button 
          buttonType='button'
          buttonStyle='ghost'
          text='Cancel'
          eventHandler={closeModal} />
        <Button 
          buttonType='button'
          buttonStyle='danger'
          text='Yes, delete'
          eventHandler={handleDelete} />
      </div>
    </div>
  );
}

export default Delete;