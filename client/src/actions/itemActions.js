//this is where the request to backend occurs

import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    //important: routes should be inside single quotes; otherwise set proxy on dependencies will not perform properly
    axios
        .get('/api/items')
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//in this case we need to add a payload
export const deleteItem = id => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addItem = item => (dispatch, getState) => {
    axios
        .post('/api/items', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

//this function could be used to show a component will data is loading
//this action does not work with dispatch because it doesnt have
//to work asynchronally with requests to server
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};
