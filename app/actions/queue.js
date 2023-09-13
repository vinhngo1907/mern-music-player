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
    return (dispatch, getState) => {
        const queueState = getState().queueState;
        const queue = [...queueState.queue];
        const newQueue = removeById(queue, id);
        const queueIds = removeById([...queueState.ids], id);

        dispatch({
            type: types.REMOVE_SONG_FROM_QUEUE,
            queue: newQueue,
            ids: queueIds
        })
    }
}

export function togglePushRoute(bool) {
    return {
        type: types.TOGGLE_PUSH_ROUTE,
        flag: bool
    };
}

export function tweakSongs(songs) {
    const ids = [];
    songs = songs.map(song => {
        ids.push(song.id);
        return {
            id: song.id,
            name: song.title,
            artist:
                song.artist_text || (song.artist && Array.isArray(song.artists) && song.artists.map(artist => artist.name).join(", ")),
            alias: song.alias,
            ...(song.thumbnail && { thumbnail: song.thumbnail })
        }
    });
}

export function replaceQueue(songs) {
    return (dispatch, getState) => {
        const songData = getState().songData.data;
        if (isEmpty(songData)) {
            dispatch({ type: types.REPLACE_QUEUE, ...tweakSongs(songs) });
            const { alias, name, id } = songs[0];
            dispatch(fetchSong(alias || changeAlias(name), id));
        } else {
            dispatch({ type: types.REPLACE_QUEUE, ...tweakSongs(songs) });
        }
    }
}

export function clearQueue() {
    return (dispatch, getState) => {
        const state = getState();
        console.log({ state })
        const playingSongId = state.songData.data.id;
        const queueState = state.queueState;
        const clearedQueue = queueState.queue.filter(
            song => song.id === playingSongId
        );

        const queueIds = queueState.ids.filter(id => id !== playingSongId);
        dispatch({
            type: types.CLEAR_QUEUE,
            queue: clearedQueue,
            ids: queueIds
        })
    }
}

export function playUserPlaylist(songs) {
    return {
        type: types.PLAY_USER_PLAYLIST,
        ids: songs.map(song => song.id),
        queue: songs
    }
}