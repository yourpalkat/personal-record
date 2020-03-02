export const getAllRuns = store =>
  store && store.runs ? store.runs.allIds : [];

export const getRunById = (store, id) =>
  store && store.runs && store.runs.byIds
    ? { ...store.runs.byIds[id], id }
    : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getRuns = store =>
  getAllRuns(store).map(id => getRunById(store, id));
