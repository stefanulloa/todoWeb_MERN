//in this file we will manage all the reducers needed for this app

//reducers dictate where states go to depending on a previous state and an action

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer
});
