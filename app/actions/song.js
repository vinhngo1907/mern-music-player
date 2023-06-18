import axios from "axios";
import { browserHistory } from "react-router";
import * as types from "../constant/action_constant";
import { MEDIA_ENDPOINT, ROOT_URL } from "../constant/endpoint_constant";
import { lrcParser } from "../utils/func";
import { togglePushRoute } from "./queue";

export function fetchSong(name, id) {
    return (dispatch) => {
        dispatch({ type: types.START_FETCHING_SONG });

        axios
            .get(`/api/media/song?name=${name}&id=${id}`)
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

                delete data.artist;
                dispatch({ type: types.FETCH_SONG_SUCCESS, data });
                dispatch(togglePushRoute(false));
                dispatch({
                    type: types.ADD_SONG_TO_QUEUE,
                    song: {
                        name: data.name,
                        id,
                        artists: data.artists,
                        thumbnail: data.thumbnail,
                    },
                });
            })
            .catch((err) => {
                console.log(err);

                dispatch({ type: types.FETCH_SONG_FAILURE });
                browserHistory.push("/notfound/song");
            });
    };
}

export function fetchSuggestedSongs({ songId, artistId }) {
    return (dispatch) => {
        axios
            .get(
                `${MEDIA_ENDPOINT}/suggested-song?artistId=${artistId}&songId=${songId}`
            )
            .then(({ data }) =>
                dispatch({
                    type: types.FETCH_SUGGESTED_SONG_SUCCESS,
                    songs: data.data.items,
                })
            )
            .catch((err) => {
                console.log(err.response)
                dispatch({
                    type: types.FETCH_SUGGESTED_SONG_FAILURE,
                })
            }
            );
    }
}

export function download({ songName, id, filename }) {
    return (dispatch) => {

    }
}