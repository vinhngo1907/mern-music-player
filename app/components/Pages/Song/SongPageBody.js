import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isAuthenticated } from '../../../HOC';
import { changeAlias } from '../../../utils/func';

const SongHeader = (props) => {
    const {
        songData,
        download,
        downloadProgress,
        authenticated,
        redirectTo,
        user,
    } = props;

    return (
        <div className="song-header">
            {/* <div className="song-header-img">
        </div> */}
            <div className="song-header-info">
                <div className="song-header-song-title">{songData.name}</div>
                <div className="song-header-song-artist"></div>
            </div>
            <div className="song-header-actions"></div>
            { downloadProgress.isDownloading && <span>The song will be downloaded in a few seconds..</span> }
        </div>
    )
}

SongHeader.propTypes = {
    songData: PropTypes.object.isRequired,
    download: PropTypes.func.isRequired,
    downloadProgress: PropTypes.object.isRequired,
    addSongToStoreTemporarily: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

export default isAuthenticated(SongHeader);