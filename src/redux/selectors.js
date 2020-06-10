export const getAllRuns = store =>
  store && store.runs ? store.runs.allIds : [];

export const getRunById = (store, id) =>
  store && store.runs && store.runs.byIds
    ? { ...store.runs.byIds[id], id }
    : {};


