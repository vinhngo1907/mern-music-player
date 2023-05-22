import store from './store';
import { isEmpty, changeAlias } from './utils/func';
import { fetchTracks } from './actions/home';
import { fetchSong, fetchSuggestedSongs } from './actions/song';
import { getChart, changeActiveChart } from './actions/chart';
import { getPlaylistCollection } from './actions/user_playlist';
import { loadUserData } from './localStorage';