import * as types from '../constant/action_constant';

const initialState = {
    activeId: '',
    tracks: [],
    pageLoaded: 1,
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.START_FETCHING_SONG:
            return { ...state, isLoading: true }

        default:
            return state;
    }
}