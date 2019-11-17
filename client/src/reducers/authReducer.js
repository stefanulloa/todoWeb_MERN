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

const iniitialSate = {
    token = localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function(state = iniitialSate, action){
    switch(action.type){
        case USER_LOADING:
            return{
                //we return the current state in additio to the change to that particular attribute, because the rest remain with the same values
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return{
                ...state,
                // we not only want the user, but also the token
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state;
    }
}