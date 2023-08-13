import chunk from 'lodash.chunk';
import { range } from '../utils/func';
import * as types from '../constant/action_constant';

const initialState = {
    defaultArtists: [],
    artists: [],
    pageChunkIndex: 0,
    pageChunks: [],
    artist: {
        song: {
            numberOfPages: 0,
            songs: [],
        },
        album: {
            numberOfPages: 0,
            albums: [],
        },
        cover: '',
        artistName: '',
        avatar: '',
        biography: {},
    },
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_SINGLE_ARTIST_ALBUMS:
            return {
                ...state,
                pageChunks: chunk(range(action.numberOfPages), 7)
            };

        case types.FETCH_DEFAULT_ARTISTS:
            return {
                ...state,
                defaultArtists: action.defaultArtists,
                artists: []
            }

        default:
            return state;
    }
}