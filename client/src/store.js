import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    //compose is needed to pass multiple enhancers
    compose(
        applyMiddleware(...middleware),
        //needed to use redux chrome dev tools
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    //when in production, change to: applyMiddleware(...middleware)
);

export default store;
