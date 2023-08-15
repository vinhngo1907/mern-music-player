import axios from 'axios';
import * as types from '../constant/action_constant';
import { startLoading, finishLoading } from './ui';
import { MEDIA_ENDPOINT } from '../constant/endpoint_constant';

export function setNumberOfPages(numberOfPages) {
    return {
        type: types.SET_NUMBER_OF_PAGES,
        numberOfPages
    }
}

export function clearAlbums() {
    return {
        type: types.CLEAR_ALBUMS
    }
}

export function changePageChunkIndex(pageChunkIndex) {
    return {
        type: types.CHANGE_PAGE_CHUNK_INDEX,
        pageChunkIndex,
    };
}

export function fetchDefaultAlbums() {
    return dispatch => {
        dispatch(startLoading());

        axios.get(`${MEDIA_ENDPOINT}/albums/default`)
            .then(({ data }) => {
                console.log(data);
                if (data) {
                    dispatch({ type: types.FETCH_DEFAULT_ALBUMS, defaultAlbums: data });

                    dispatch(clearAlbums()); // clear the albums data
                    dispatch(finishLoading());
                }
            })
            .catch(err => {
                dispatch(finishLoading());
                throw err;
            });
    };
}


export function fetchAlbums(genre, id, page) {
    const pageQuery = page ? `&page=${page}` : '';
    return dispatch => {
        dispatch(startLoading());
        axios.get(`${MEDIA_ENDPOINT}/albums?genre=${genre}&id=${id}${pageQuery}`)
            .then(({ data }) => {
                console.log(data);
                if (data.items && data.items.length) {
                    dispatch({ type: types.FETCH_ALBUMS, defaultAlbums: data.items });
                    dispatch(setNumberOfPages(Math.round(data.total / 20)));
                    dispatch(finishLoading());
                }
            })
            .catch(error => {
                dispatch(finishLoading());
                throw error;
            });
    }
}

export function clearPlaylist() {
    return { type: types.CLEAR_PLAYLIST };
}