import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from "./auth_reducer";

export default combineReducers({
    auth: authReducer,
    routing: routerReducer
})