import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from "./authReducer";
import UIReducer from './uiReducer';
import queueReducer from './queueReducer';

export default combineReducers({
    routing: routerReducer,
    auth: authReducer,
    UIState: UIReducer,
    queueState: queueReducer
})