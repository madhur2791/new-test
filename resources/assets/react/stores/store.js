/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/reducer';

const preloadedState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

export default store;
