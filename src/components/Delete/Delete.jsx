import React from 'react';
import { getToken } from '../../services/tokenService';

const Delete = ({ cancel, hideMoreInfo }) => {
  const handleDelete = () => {
    try {
      const id = run._id;
      const res = await axios.post(`/api/runs/delete/`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        data: {
          'id': id
        }
      });
      console.log(`Deleted run id ${res.data.data.id}`);
      hideMoreInfo();
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