import React from 'react';
import MainView from '../../MainView';
import GenreMenu from '../../GenreMenu';
import ArtistCard from './ArtistCard';

const ArtistGenrePage = (props) => {
  return (
    <div>
      <GenreMenu type="artist"/>
      <MainView type="artist" chunkSize={5} {...props} Card={ArtistCard}/>
    </div>
  );
};

export default ArtistGenrePage;