import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import LinksByComma from '../LinksByComma';

function AlbumResult({ albums, clearSearchResult }) {
    return (
        <ul className='album-result'>
            <div className='search-li-title'>
                Albums
            </div>
        </ul>
    )
}

export default AlbumResult;