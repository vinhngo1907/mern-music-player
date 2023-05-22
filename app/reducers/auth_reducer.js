import * as types from '../constant/action_constant';

const initialState = {
    authenticated: false,
    user: {},
    errors: {},
    isProcessing: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SIGN_UP_SUCCESS:

        case types.LOG_IN_SUCCESS:
            return { ...state, user: action.user, authenticated: true }

        default:
            return state;
    }
}