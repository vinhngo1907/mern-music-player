import axios from 'axios';
import * as types from '../constant/action_constant';
import { startLoading, finishLoading } from './ui';

export function setPageNumber(numberOfPages) {
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