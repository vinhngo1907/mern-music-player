import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
// import { Karaoke as KarokeContainer } from './';
import { Pages } from '../components';
import { fetchSong, fetchSuggestedSongs, download } from '../actions/song';
import { addSongToStoreTemporarily } from '../actions/user_playlist';
import { showAnalyzer, toggleModal } from '../actions/ui';
import { getSongUrl, isEmpty } from '../utils/func';


class SongPage extends React.Component {
    componentDidMount() {
        // this.props.showAnalyer();

        const { name, id } = this.props.params;

        if (isEmpty(this.props.songData) || id !== this.props.songData.id) {
            this.props.fetchSong(name, id);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { routing: { localtionBeforeTransitions: currLoc } } = this.props;
        const { routing: { localtionBeforeTransitions: nextLoc } } = this.nextProps;
        const { id: nextId, name } = nextProps.songData;
        if (nextProps.params.id === nextId) {
            return;
        }

        if (nextProps.canPushRoute && nextId !== this.props.songData.id) {
            browserHistory.push(getSongUrl(name, nextId));
            return;
        }

        if (((!currLoc && nextLoc) ||
            (currLoc && nextLoc && currLoc.pathname !== nextLoc.pathname)) && /song\/.+/.test(nextLoc.pathname)
        ) {
            if (this.props.params.id !== nextId) {
                return;
            }
            const { name, id } = nextProps.params;
            this.props.fetchSong(name, id);
        }
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
                <Pages.SongPageBody suggestedSongs={this.props.suggestedSongs} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suggestedSongs: state.songData.suggestedSongs,
        songData: state.songData.data,
        downloadProgress: state.UIState.downloadProgress,
        routing: state.routing,
        canPushRoute: state.queueState.pushRoute,
    };
}

export default connect(mapStateToProps,
    {
        fetchSong,
        // showAnalyzer,
        fetchSuggestedSongs,
        download,
        addSongToStoreTemporarily,
        toggleModal,
    })(SongPage);
