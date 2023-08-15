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

export function clearArtist() {
    return {
        type: types.CLEAR_ARTIST
    }
}

export function changePageChunkIndex(pageChunkIndex) {
    return {
        type: types.CHANGE_PAGE_CHUNK_INDEX,
        pageChunkIndex,
    };
}

export function fetchDefaultArtists() {
    return dispatch => {
        dispatch(startLoading());
        axios.get(`${MEDIA_ENDPOINT}/artists/default`)
            .then(({ data }) => {
                console.log(data)
                dispatch({ type: types.FETCH_DEFAULT_ARTISTS, defaultArtists: data.origins });
                dispatch(finishLoading());
            })
            .catch(error => {
                dispatch(finishLoading());
                throw error;
            });
    };
};

export function fetchArtists(name, type = 'songs', page) {
    const pageQuery = page ? `?page=${page}` : '';
    return dispatch => {
        axios.get(`${MEDIA_ENDPOINT}/artist/${name}/${type}${pageQuery}`)
            .then(({ data }) => {
                switch (type) {
                    case 'songs':
                        dispatch(fetchSong(data));
                        break;
                    case 'albums':
                        dispatch(fetchAlbum(data));
                        break;
                    case 'biography':
                        dispatch(fetchBio(data));
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                dispatch(finishLoading());
                throw error;
            })
    }
}

export function fetchAlbum(data) {
    return {
        type: types.FETCH_SINGLE_ARTIST_ALBUMS,
        ...data,
    };
}

export function fetchSong(data) {
    return {
        type: types.FETCH_SINGLE_ARTIST_SONGS,
        ...data,
    };
}

export function clearArtists() {
    return {
        type: types.CLEAR_ARTISTS
    }
}

function fetchBio(data) {
    return {
        type: types.FETCH_SINGLE_ARTIST_BIOGRAPHY,
        ...data,
    };
}
