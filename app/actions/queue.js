import * as types from "../constant/action_constant";
import { changeAlias, isEmpty, removeById } from "../utils/func";
import { fetchSong } from "./song";


export function addSongToQueue(song) {
    const { name, id } = song;
    return (dispatch, getState) => {
        const queue = getState().queueState.queue;
        if (!queue.length) {
            dispatch(fetchSong(name, id));
        } else {
            dispatch({ type: types.ADD_SONG_TO_QUEUE, song });
        }
    }
}

export function removeSongFromQueue(id) {

}

export function togglePushRoute(bool) {
    return {
        type: types.TOGGLE_PUSH_ROUTE,
        flag: bool
    };
}

export function tweekSongs(songs) {

}

export function replaceQueue(songs){

}

export function clearQueue(){

}

export function playUserPlaylist(songs){

}