import { ADD_RUN } from "./actionTypes";

export const addRun = content => ({
  type: ADD_RUN,
  payload: {
    content
  }
});

// export const toggleTodo = id => ({
//   type: TOGGLE_TODO,
//   payload: { id }
// });

// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
