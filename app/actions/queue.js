import * as types from "../constant/action_constant";
import { changeAlias, isEmpty, removeById } from "../utils/func";
import { fetchSong } from "./song";


export function addSongToQueue() {

}

export function removeSongFromQueue(id) {

}

export function togglePushRoute(bool) {
    return {
        type: types.TOGGLE_PUSH_ROUTE,
        flag: bool
    };
}

export function tweekSong(songs) {

}