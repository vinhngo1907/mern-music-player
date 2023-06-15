import axios from 'axios';
import { USER_ENDPOINT } from '../constant/endpoint_constant';
import * as types from '../constant/action_constant';

export function login(userCredentials) {
    return dispatch => {
        dispatch({ type: types.START_PROCESSING });
        axios.post(`${USER_ENDPOINT}/login`, userCredentials)
            .then(({ data: user }) => {
                localStorage.setItem('user', JSON.stringify(user))
                dispatch({ type: types.LOG_IN_SUCCESS, user });
                dispatch({ type: types.FINISH_PROCESSING });
            })
            .catch(err => {
                console.log(err.response.data)
                dispatch({ type: types.LOG_IN_FAILURE, errors: err.response.data.errors || err });
                dispatch({ type: types.FINISH_PROCESSING });
            })
    }
}

export function signup(userCredentials) {

}

export function logout() {
    localStorage.removeItem("user");
    return {
        type: types.LOG_OUT
    }
}

export function clearErrors() {
    return {
        type: types.CLEAR_ERRORS
    }
}