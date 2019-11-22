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

//register user
export const register = ({ name, email, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    //request body that is being sent to api
    const body = JSON.stringify({ name, email, password });

    //we send both the body data and the headers to the api
    axios
        .post('/api/users', body, config)
        .then(res =>
            dispatch({
                type: REGISTER_SUCCESS,
                //the res is the user and token
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    //we are setting an id for register modal to know if it has to show this error
                    'REGISTER_FAIL'
                )
            );
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

//login user
export const login = ({ email, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    //request body that is being sent to api
    const body = JSON.stringify({ email, password });

    //we send both the body data and the headers to the api
    axios
        .post('/api/auth', body, config)
        .then(res =>
            dispatch({
                type: LOGIN_SUCCESS,
                //the res is the user and token
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    //we are setting an id for login modal to know if it has to show this error
                    'LOGIN_FAIL'
                )
            );
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

//logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
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
