import axios from 'axios';
import { getToken } from './tokenService';

export const fetchRuns = async (id) => {
  try {
    const res = await axios.post(`/api/runs`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      data: {
        'userId': id
      }
    });
    const sortedRuns = res.data.data;
    sortedRuns.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    return sortedRuns;
  } catch (e) {
    console.error(e);
  }
}
