import React from "react";
import { connect } from 'react-redux';
import { Pages } from '../components';
import { isTwoObjectEqual } from '../utils/func';
import { fetchDefaultAlbums, fetchAlbums, changePageChunkIndex } from '../actions/album';

class AlbumGenrePage extends React.Component{
    render(){
        return (
            <Pages.AlbumGenrePage />
        );
    }
}

function mapStateToProps(state) {
    return { ...state.albumState, isLoading: state.UIState.isLoading };
  }
  
  export default connect(mapStateToProps,
  { fetchDefaultAlbums, fetchAlbums, changePageChunkIndex, clearAlbums })(AlbumGenrePage);
  