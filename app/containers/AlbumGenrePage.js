import React from "react";
import { connect } from 'react-redux';
import { Pages } from '../components';
import { isTwoObjectEqual } from '../utils/func';
import { fetchDefaultAlbums, fetchAlbums, changePageChunkIndex, clearAlbums } from '../actions/album';

class AlbumGenrePage extends React.Component {
    componentDidMount() {
        const { genre, id } = this.props.params;
        if (id && genre) {
            this.props.fetchAlbums(genre, id);
        } else {
            this.props.fetchDefaultAlbums();
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <Pages.AlbumGenrePage {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return { ...state.albumState, isLoading: state.UIState.isLoading };
}

export default connect(mapStateToProps,
    { fetchDefaultAlbums, fetchAlbums, changePageChunkIndex, clearAlbums })(AlbumGenrePage);
