import * as types from '../constant/action_constant';
// import { findIndex } from '../utils/func';

const initialState = {
    playlists: [],
    tmpSong: {},
};

export default function (state = initialState, action) {
    switch (action.type) {

        case types.GET_PLAYLIST_COLLECTION:
            return { ...state, playlists: action.playlists };
        
        case types.DELETE_PLAYLIST:
            return { ...state, playlists: action.playlists };

        case types.CLEAR_USER_PLAYLIST:
            return initialState

        default:
            return state;
    }
}