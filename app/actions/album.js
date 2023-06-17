import axios from 'axios';
import * as types from '../constant/action_constant';
import { startLoading, finishLoading } from './ui';

export function setPageNumber(numberOfPages) {
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

export function changePageChunkIndex(pageChunkIndex) {
    return {
        type: types.CHANGE_PAGE_CHUNK_INDEX,
        pageChunkIndex,
    };
}