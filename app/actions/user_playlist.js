import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as types from '../constant/action_constant';
import { PLAYLIST_ENDPOINT } from '../constant/endpoint_constant';
import { loadUserData } from '../localStorage';

let cachedUser = {
    username: '',
    access_token: ''
}

function getUser() {
    if (cachedUser.username && cachedUser.access_token) {
        return cachedUser;
    }

    const user = loadUserData();
    if (user && user.username && user.access_token) {
        cachedUser.username = user.username;
        cachedUser.access_token = user.access_token;
    }
    return cachedUser;
}

const instance = (accessToken) => {
    return axios.create({
        baseURL: PLAYLIST_ENDPOINT,
        ...accessToken && { headers: { Authorization: accessToken } }
    })
}

export function getPlaylistCollection() {
    const { username, access_token } = getUser();
    return dispatch => {
        instance()
    }
}

export function addSongToPlaylist(playlistTitle, songObj) {
    const { username, access_token } = getUser();
}

export function addSongToStoreTemporarily(song) {
    return {
        type: types.ADD_SONG_TO_STORE_TEMPORARILY,
        song
    }
}

export function clearUserPlaylist() {
    cachedUser = {
        username: '',
        access_token: ''
    };

    return {
        type: types.CLEAR_USER_PLAYLIST
    };
}