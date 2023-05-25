import store from './store';
import { isEmpty, changeAlias } from './utils/func';
// import { fetchTracks } from './actions/home';
// import { fetchSong, fetchSuggestedSongs } from './actions/song';
// import { getChart, changeActiveChart } from './actions/chart';
// import { getPlaylistCollection } from './actions/user_playlist';
import { loadUserData } from './localStorage';

export function fetchDataForHomePage() {
    const state = store.getState();
    // Only fetch `pop` chart if there isn't one else get it from the state
    // if (isEmpty(state.chartState.pop)) {
    //     store.dispatch(getChart('pop'));
    // } else {
    //     store.dispatch(changeActiveChart('pop'));
    // }
}

function shouldGetChart(charts, type) {
    if (isEmpty(charts[type])) {
        return true;
    } return false;
}