import * as types from '../constant/action_constant';

const initialState = {
    queue: [],
    ids: [],
    pushRoute: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.CLEAR_QUEUE:
            return {
                ...state,
                queue: action.queue,
                ids: action.ids
            }
        case types.TOGGLE_PUSH_ROUTE:
            return { ...state, pushRoute: action.flag }
        default:
            return state;
    }
}