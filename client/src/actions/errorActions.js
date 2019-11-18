import { GET_ERRORS, CLEAR_ERRORS } from './types';

//error actions do not work with dispatch because they dont have
//to work asynchronally with requests to server

//id is optional
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
