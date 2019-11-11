//this is where the request to backend occurs

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";

export const getItems = () => {
    return {
        type: GET_ITEMS
    };
};

//in this case we need to add a payload
export const deleteItem = id => {
    return {
        type: DELETE_ITEM,
        payload: id
    };
};

export const addItem = item => {
    return {
        type: ADD_ITEM,
        payload: item
    };
};
