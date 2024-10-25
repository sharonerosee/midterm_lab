// actions.js
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
});
