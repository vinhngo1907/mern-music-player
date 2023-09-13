import React from 'react';
import { Link } from 'react-router';
// import { changeAlias } from '../../utils/func';
// import LinksByComma from '../LinksByComma';

function AlbumResult({ albums, clearSearchResult }) {
    return (
        <ul className='album-result'>
            <div className='search-li-title'>
                Albums
            </div>
            {
                albums.map(album => (
                    <li key={`search-${album.encodeId}`}>
                        <div className='search-li-detail'>
                            <img src={album.thumbnailM} alt='' />
                            <div className='search-li-info'>
                                <div>
                                    <Link
                                        to={`/album/playlist/${album.link.split("/")[2]}/${album.encodeId}`}
                                        onClick={() => clearSearchResult()}
                                    >
                                        {album.title}
                                    </Link>
                                </div>
                                <div className='search-li-artist'>
                                    {album.artistsNames}
                                </div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default AlbumResult;