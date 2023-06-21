import React from "react";
import { Link } from "react-router";

function ArtistResult({ artists, clearSearchResult }) {
    artists = artists.map(artist => {
        let alias = artist.link.split("/")[2];
        return { ...artist, alias: alias }
    });

    return (
        <ul className="artist-result">
            <div className="search-li-title">Artist</div>
        </ul>
    )
}

export default ArtistResult;