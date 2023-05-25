import axios from "axios";
import { browserHistory } from "react-router";
import * as types from "../constant/action_constant";
import { MEDIA_ENDPOINT, ROOT_URL } from "../constant/endpoint_constant";
import { lrcParser } from "../utils/func";

export function fetchSong(name, id) {
    return (dispatch) => {
        dispatch({ type: types.START_FETCHING_SONG });
        axios.get(`/api/media/song?name=${name}&id=${id}`)
            .then(response => {
                let data = response.data;
                axios
                    .get(data.lyric)
                    .then(({ data: lrcString }) => {
                        data.lyric = lrcParser(lrcString).scripts;
                    })
                    .catch((err) => console.log(err));
                data.cover = data.artist ? data.artist.cover : "";
                const ids = {
                    songId: data.id,
                    artistId: data.artist.id,
                };
                dispatch(fetchSuggestedSongs(ids));
            })
            .catch(err => {
                console.log(err);
            });

        dispatch(fetchSuggestedSongs(ids));
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