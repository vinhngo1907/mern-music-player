import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from "./authReducer";
import UIReducer from './uiReducer';
import queueReducer from './queueReducer';
import trackReducer from './trackReducer';
import chartReducer from './chartReducer';
import songReducer from './songReducer';
import albumReducer from './albumReducer';

export default combineReducers({
    routing: routerReducer,
    auth: authReducer,
    UIState: UIReducer,
    queueState: queueReducer,
    trackState: trackReducer,
    chartState: chartReducer,
    songData: songReducer,
    albumState: albumReducer
});