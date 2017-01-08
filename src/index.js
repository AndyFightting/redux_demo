import React from 'react';
import ReactDOM from 'react-dom';
import MyView from './MyView';

import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {applyMiddleware, createStore,combineReducers,compose } from 'redux'

import createLogger from 'redux-logger';
const logger = createLogger();

import DevTools from './DevTools'

// if (process.env.NODE_ENV !== 'production') {
//
// }else {
//
// }

function numReducer(state = 0, action) {
    switch (action.type) {
        case 'NUM':
            return state + action.num;
        default:
            return state
    }
}

function stringReducer(state = [], action) {
    switch (action.type) {
        case 'STRING':
            return state.concat([action.msg]);
        default:
            return state
    }
}

const rootReducer = combineReducers({
    numReducer,
    stringReducer,
});

const enhancer = compose(
    applyMiddleware(thunk,logger),
    DevTools.instrument(),
);

const store  = createStore(
    rootReducer,
    enhancer
);

ReactDOM.render(
    <Provider store={store}>
        <MyView />
    </Provider>,
  document.getElementById('root')
);