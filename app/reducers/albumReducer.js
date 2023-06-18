import chunk from 'lodash.chunk';
import { range } from '../utils/func';
import * as types from '../constant/action_constant';

const initialState = {
    defaultAlbums: [],
    albums: [],
    numberOfPages: 0,
    pageChunkIndex: 0,
    pageChunks: [],
    playlist: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_DEFAULT_ALBUMS:
            return { ...state, defaultAlbums: action.defaultAlbums }

        case types.FETCH_ALBUMS:
            return { ...state, albums: action.album }

        case types.CLEAR_ALBUMS:
            return { ...state, albums: [] }

        case types.FETCH_ALBUM_PLAYLIST:
            return { ...state, playlist: action.playlist };

        case types.SET_NUMBER_OF_PAGES:
            return {
                ...state,
                numberOfPages: action.numberOfPages,
                pageChunks: action.pageChunks
            }

        case types.CLEAR_PLAYLIST:
            return { ...state, playlist: {} }

        case types.CHANGE_PAGE_CHUNK_INDEX:
            return { ...state, pageChunkIndex: action.pageChunkIndex };

        default:
            return state;
    }
}