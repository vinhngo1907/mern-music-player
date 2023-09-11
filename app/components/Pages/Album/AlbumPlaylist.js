import React from 'react';
import Playlist from '../../Playlist';
import { Karaoke } from '../../../containers';
import { isEmpty } from '../../../utils/func';
import './album_playlist.sass';

class AlbumPlaylist extends React.Component {
    state = { showArtistInfo: false };

    truncateInfo(info) {
        if (info.length > 100) { return info.substring(0, 100) + '...' }
        else { return info; }
    }
    
    render() {
        const { playlist, replaceQueue, isPlaying } = this.props;
        const { showArtistInfo } = this.state;
        if (isEmpty(playlist)) return null;

        return (
            <div className='album-playlist'>
                <div className='album-playlist-header'></div>
                <div className='album-playlist-content'></div>
            </div>
        )
    }
}

export default AlbumPlaylist;