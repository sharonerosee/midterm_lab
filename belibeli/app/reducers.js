// reducers.js
const initialState = {
    transactions: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [...state.transactions, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  