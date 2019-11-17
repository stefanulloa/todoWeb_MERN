import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

//check token and load user
//we need to pass getstate to access the token which is in the state
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING });

    //the headers are passed as second parameter
    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        )
        //in case of error, we dispatch auth error state
        //but before we also dispatch 'error' error state
        //using an error action (by providing any error err); in this case we dont need error id
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//set up headers with token for axios request
export const tokenConfig = getState => {
    //get token from localstorage (in auth reducer)
    const token = getState().auth.token;

    //in axios: headers are placed in an object config, as defined as follows (using plural "headers")
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    //if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};
