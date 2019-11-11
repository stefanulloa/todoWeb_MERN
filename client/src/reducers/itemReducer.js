import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';


//for now the data is hardcoded until connecting with backend
const initialState = {
    items: [
        { id: uuid(), name: 'Eggs'},
        { id: uuid(), name: 'Oranges'},
        { id: uuid(), name: 'Bread'},
        { id: uuid(), name: 'Shampoo'}
    ]
}

//the reducer needs a function to perform actions on the states
//it receives two parameters, the current state and the action
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state
            }
        default:
            return state;
    }
}