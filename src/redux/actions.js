import { ADD_RUN, REPLACE_RUN } from "./actionTypes";

export const addRun = content => ({
  type: ADD_RUN,
  payload: {
    content
  }
});

export const replaceRun = content => ({
  type: REPLACE_RUN,
  payload: {
    content
  }
});