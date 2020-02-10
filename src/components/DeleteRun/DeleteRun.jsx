import React from 'react';
import axios from 'axios';

import './DeleteRun.scss';

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
    <div className='modal-outer'>
      <div className='modal-inner'>
        <h4>Are you sure you want to delete this run?</h4>
        <p>This cannot be undone.</p>
        <button className='cancel' onClick={closeModal}>Cancel</button>
        <button className='submit' onClick={handleDelete}>Yes, delete</button>
      </div>
    </div>
  );
}

export default Delete;