//this is where the request to backend occurs

import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    //important: routes should be inside single quotes; otherwise set proxy on dependencies will not perform properly
    axios.get('/api/items').then(res =>
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    );
};

//in this case we need to add a payload
export const deleteItem = id => dispatch => {
    axios.delete(`/api/items/${id}`).then(res =>
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    );
};

export const addItem = item => dispatch => {
    axios.post('/api/items', item).then(res =>
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
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
