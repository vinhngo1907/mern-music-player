import axios from 'axios';
import { USER_ENDPOINT } from '../constant/endpoint_constant';
import * as types from '../constant/action_constant';

export function login(userCredentials){

}

export function signup(userCredentials){
    
}

export function logout(){
    localStorage.removeItem("user");
    return {
        type: types.LOG_OUT
    }
}

export function clearErrors(){
    return {
        type: types.CLEAR_ERRORS
    }
}