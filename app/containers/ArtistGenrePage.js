import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDefaultArtists, fetchArtists, clearArtists } from '../actions/artist';
import { changePageChunkIndex } from '../actions/album';
import { Pages } from '../components';
import { isTwoObjectEqual } from '../utils/func';

class ArtistGenrePage extends Component {
    componentDidMount() {
        const { id, genre } = this.props.params;
        if (id && genre) {
            this.props.fetchArtists(genre, id);
        } else {
            this.props.clearArtists();
            this.props.fetchDefaultArtists();
        }
    }

    render() {
        return (
            <Pages.ArtistGenrePage {...this.props} />
        );
    }
}

function mapStateToProps(state) {
    return { ...state.artistState, isLoading: state.UIState.isLoading };
  }
  
  export default connect(mapStateToProps,
  { fetchDefaultArtists, fetchArtists, changePageChunkIndex, clearArtists })(ArtistGenrePage);
  