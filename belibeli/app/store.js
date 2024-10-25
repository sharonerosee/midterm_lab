import { createStore } from 'redux';
import rootReducer from './reducers'; // Import reducer utama

// Buat Redux store
const store = createStore(rootReducer);

export default store;
