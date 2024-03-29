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
        // fetch default albums if the user navigate to the index album route

        if (nextProps.location.pathName !== this.props.location.pathName &&
            /albums$/.test(nextProps.location.pathname)) {
            this.props.fetchDefaultAlbums();
            return
        }
        const nextPage = nextProps.location.query.page;
        const currentPage = this.props.location.query.page;

        // fetch new albums if the album route genre changes
        if (!isTwoObjectEqual(nextProps.params, this.props.params)) {
            const { id, genre } = nextProps.params;
            this.props.fetchAlbums(genre, id);
            this.props.changePageChunkIndex(0);
        }
        
        // fetch new albums if the current album route is appended with the `?page=` query
        if (nextPage && nextPage !== currentPage) {
            const { id, genre } = this.props.params;
            this.props.fetchAlbums(genre, id, nextPage);
            return;
        }
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
