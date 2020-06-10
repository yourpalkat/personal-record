import { SET_USER, LOG_OUT, SET_RUNS, SET_SELECTED_RUN, ADD_RUN, REMOVE_RUN, REPLACE_RUN } from "./actionTypes";

const initialState = {
  isLoggedIn: false,
  user: {},
  token: {},
  userRuns: [],
  selectedRun: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
        isLoggedIn: true,
      };
    }
    case LOG_OUT: {
      return initialState;
    }
    case SET_RUNS: {
      const { userRuns } = action.payload;
      return {
        ...state,
        userRuns
      };
    }
    case SET_SELECTED_RUN: {
      const { selectedRun } = action.payload;
      return {
        ...state,
        selectedRun
      };
    }
    case ADD_RUN: {
      const { newRun } = action.payload;
      const allRuns = [...state.userRuns];
      allRuns.push(newRun);
      return {
        ...state,
        userRuns: allRuns
      };
    }
    case REMOVE_RUN: {
      const { runToRemove } = action.payload;
      const allRuns = [...state.userRuns];
      const index = allRuns.findIndex(run => run._id === runToRemove._id);
      if (index !== -1) {
        allRuns.splice(index, 1);
        return {
          ...state,
          userRuns: allRuns
        };
      };
      return state;
    }
    case REPLACE_RUN: {
      const { newRun } = action.payload;
      const allRuns = [...state.userRuns];
      const index = allRuns.findIndex(run => run._id === newRun._id);
      if (index !== -1) {
        allRuns[index] = { ...newRun };
        return {
          ...state,
          userRuns: allRuns
        };
      }
      return state;
    }
    default:
      return state;
  }
}
