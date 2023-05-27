import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as types from '../constant/action_constant';
import { PLAYLIST_ENDPOINT } from '../constant/endpoint_constant';

let cachedUser = {
    username: '',
    access_token: ''
}

export function clearUserPlaylist() {
    cachedUser = {
        username: '',
        access_token: ''
    }

    return {
        type: types.CLEAR_USER_PLAYLIST
    }
}