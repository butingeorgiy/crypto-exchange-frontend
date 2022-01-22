import { combineReducers } from 'redux';

// Reducers
import generalReducer from './general/reducer';

export default combineReducers({
    general: generalReducer
});
