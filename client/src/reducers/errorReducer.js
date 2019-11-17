import { GET_ERROS, CLEAR_ERROS } from '../actions/types';

const initialState = {
    //msg and status come from the server
    msg: {},
    status: null,
    id: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERROS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        case CLEAR_ERROS:
            //so that old erros do not remain
            return {
                msg: {},
                status: null,
                id: null
            };
    }
}
