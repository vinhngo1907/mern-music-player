import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
// import { Karaoke as KarokeContainer } from './';
import { Pages } from '../components';
import { fetchSong, fetchSuggestedSongs, download } from '../actions/song';
// import { addSongToStoreTemporarily } from '../actions/user_playlist';
// import { showAnalyzer, toggleModal } from '../actions/ui';
import { getSongUrl, isEmpty } from '../utils/func';


class SongPage extends React.Component {
    componentDidMount() {
        this.props.showAnalyer();

        const { name, id } = this.props.params;

        if (isEmpty(this.props.songData) || id !== this.props.songData.id) {
            this.props.fetchSong(name, id);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { routing: { localtionBeforeTransitions: currLoc } } = this.props;
        const { routing: { localtionBeforeTransitions: nextLoc } } = this.nextProps;
        const { id: nextId, name } = nextProps.songData;

    }

    render() {
        return (
            <div>
                <Pages.SongHeader
                    songData={this.props.songData}
                    download={this.props.download}
                    downloadProgress={this.props.downloadProgress}
                    toggleModal={this.props.toggleModal}
                    addSongToStoreTemporarily={this.props.addSongToStoreTemporarily}
                />
            </div>
        )
    }
}

export default SongPage;