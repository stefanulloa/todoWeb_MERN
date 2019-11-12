import uuid from 'uuid';
import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING
} from '../actions/types';

//for now the data is hardcoded until connecting with backend
const initialState = {
    items: [],
    loading: false //activated while data is being fetched
};

//the reducer needs a function to perform actions on the states
//it receives two parameters, the current state and the action
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case DELETE_ITEM:
            return {
                //note thw change from "id" to "_id" because of mongodb
                // if line "...state," is added here (as taught), it does not have any effect
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ADD_ITEM:
            return {
                // if line "...state," is added here (as taught), it does not have any effect
                items: [action.payload, ...state.items]
            };
        case ITEMS_LOADING:
            return {
                //although state has not changed it has to be passed
                ...state,
                loading: true
            };

        default:
            return state;
    }
}
