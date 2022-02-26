import { combineReducers } from 'redux';

// Reducers
import generalReducer from './general/reducer';
import userReducer from './user/reducer';
import popupsReducer from './popups/reducer';
import exchangeReducer from './exchange/reducer';

export default combineReducers({
    general: generalReducer,
    user: userReducer,
    popups: popupsReducer,
    exchange: exchangeReducer
});
