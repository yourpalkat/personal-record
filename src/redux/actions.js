import { SET_USER, SET_RUNS, SET_SELECTED_RUN, ADD_RUN, REPLACE_RUN, REMOVE_RUN, LOG_OUT } from './actionTypes';

export const setUser = (user, token) => ({ 
  type: SET_USER,
  payload: {
    user,
    token,
  },
});

export const setRuns = (userRuns) => ({
  type: SET_RUNS,
  payload: {
    userRuns,
  }
});

export const setSelectedRun = (selectedRun) => ({
  type: SET_SELECTED_RUN,
  payload: {
    selectedRun,
  }
});

export const addRun = (newRun) => ({
  type: ADD_RUN,
  payload: {
    newRun,
  }
});

export const replaceRun = (newRun) => ({
  type: REPLACE_RUN,
  payload: {
    newRun,
  }
});

export const removeRun = (runToRemove) => ({
  type: REMOVE_RUN,
  payload: {
    runToRemove,
  }
});

export const logOut = () => ({
  type: LOG_OUT,
});

