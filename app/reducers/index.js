import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from "./authReducer";
import UIReducer from './uiReducer';
import queueReducer from './queueReducer';
import trackReducer from './trackReducer';
import chartReducer from './chartReducer';
import songReducer from './songReducer';
import albumReducer from './albumReducer';
import playerReducer from './playerReducer';
import playlistReducer from './userPlaylistReducer';
import artistReducer from './artistReducer';

export default combineReducers({
    routing: routerReducer,
    auth: authReducer,
    UIState: UIReducer,
    queueState: queueReducer,
    trackState: trackReducer,
    chartState: chartReducer,
    songData: songReducer,
    albumState: albumReducer,
    playerState: playerReducer,
    playlistState: playlistReducer,
    artistState: artistReducer,
});