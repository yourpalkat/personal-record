import React from 'react';
import axios from 'axios';

const Delete = ({ cancel, finishDelete, run }) => {
  const handleDelete = async () => {
    try {
      console.log(run._id);
      const res = await axios.delete(`/api/runs/delete/${run._id}`);
      console.log(`Deleted: ${res}`);
      finishDelete();
      cancel();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className='show-more-wrapper'>
      <h4>Are you sure you want to delete this run?</h4>
      <p>This cannot be undone.</p>
      <button className='cancel' onClick={cancel}>Cancel</button>
      <button className='submit' onClick={handleDelete}>Yes, delete</button>
    </div>
  );
}

export default Delete;