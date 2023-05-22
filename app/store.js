import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { saveQueueState, loadQueueState, loadUserData } from './localStorage';

let middleware = [thunk];
// apply logger middleware in the development environment

if (process.env.NODE_ENV !== 'production') {
  const logger = require('./logger').default;

  middleware = [...middleware/* , logger */];
}

const queueFromLocalStorage = loadQueueState();