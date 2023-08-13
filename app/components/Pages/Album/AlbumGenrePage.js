import React from 'react';
import MainView from '../../ManiView';
import GenreMenu from '../../GenreMenu';
import AlbumCard from './AlbumCard';

const AlbumGenrePage = (props) => {
    return (
        <div>
            <GenreMenu type="album" />
            <MainView type="album" chunkSize={4} {...props} Card={AlbumCard} />
        </div>
    );
};

export default AlbumGenrePage;
