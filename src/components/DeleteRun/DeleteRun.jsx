import React from 'react';
import axios from 'axios';

import Button from '../Button/Button';

import deleteStyles from './DeleteRun.module.scss';

const Delete = ({ closeModal, setRun, run }) => {
  const handleDelete = async () => {
    try {
      console.log(run._id);
      const res = await axios.delete(`/api/runs/delete/${run._id}`);
      console.log(`Deleted: ${res}`);
      setRun({});
      closeModal();
    } catch (e) {
      console.error(e);
    }
  }

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