import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import SongResult from "./SongResult";
import ArtistResult from "./ArtistResult";
import AlbumResult from "./AlbumResult";
import './index.sass';

class SearchMenu extends Component {
    handleClickOutside = () => {
        this.props.clearSearchResult();
    }
    render() {
        const { data } = this.props.searchResult;
        if (!data) return null;

        return (
            <ul className='search-menu'>
                <SongResult songs={data.songs || []} clearSearchResult={this.props.clearSearchResult} />
                <ArtistResult artists={data.artists || []} clearSearchResult={this.props.clearSearchResult} />
                <AlbumResult albums={data.playlists || []} clearSearchResult={this.props.clearSearchResult} />
            </ul>
        )
    }
}

SearchMenu.propTypes = {
    searchResult: PropTypes.object.isRequired,
    clearSearchResult: PropTypes.func.isRequired
};

export default onClickOutside(SearchMenu);