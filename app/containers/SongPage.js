import React from 'react';
// import { browserHistory } from 'react-router';
// import { connect } from 'react-redux';
// import { Karaoke as KarokeContainer } from './';
// import { Pages } from '../components';
// import { fetchSong, fetchSuggestedSongs, download } from '../actions/song';
// import { addSongToStoreTemporarily } from '../actions/user_playlist';
// import { showAnalyzer, toggleModal } from '../actions/ui';
import { getSongUrl, isEmpty } from '../utils/func';


class SongPage extends React.Component {
    componentDidMount(){
        this.props.showAnalyer();
    }
}

export default SongPage;