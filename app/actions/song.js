import axios from "axios";
import { browserHistory } from "react-router";
import * as types from "../constant/action_constant";
import { MEDIA_ENDPOINT, ROOT_URL } from "../constant/endpoint_constant";
import { lrcParser } from "../utils/func";

export function fetchSong(name, id) {
    return (dispatch) => {
        dispatch({ type: types.START_FETCHING_SONG });
    }
}

export function fetchSuggestedSongs({ songId, artistId }) {
    return (dispatch) => {

    }
}

export function download({ songName, id, filename }) {
    return (dispatch) => {

    }
}