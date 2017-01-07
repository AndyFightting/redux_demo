import React from 'react';
import ReactDOM from 'react-dom';
import MyView from './MyView';
import {Provider} from 'react-redux'
import { createStore,combineReducers } from 'redux'

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

const store  = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <MyView />
    </Provider>,
  document.getElementById('root')
);