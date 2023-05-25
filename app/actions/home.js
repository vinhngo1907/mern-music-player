import axios from 'axios';
import * as types from '../constant/action_constant';
import { pageQuery } from '../utils/func';
import { MEDIA_ENDPOINT } from '../constant/endpoint_constant';
import { startFading, stopFading } from '../actions/ui';

// the POP music type id
let cachedId = 'ZWZB96AB';

export function fetchTracks(page, id='ZWZB96AB'){
    return dispatch =>{
        dispatch({type:types.START_FETCHING_SONG});
        if(id !== cachedId){
            dispatch(startFading())
            cachedId = id;
        }
    }
}