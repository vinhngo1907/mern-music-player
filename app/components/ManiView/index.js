import React from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash.chunk';
import Pagination from '../Pagination';
import './index.sass';

const MainView = (props) => {
	const { type, isLoading } = props;
	return (
		<div>
			{
				type === 'album' ? <AlbumView {...props} /> : <ArtistView {...props} />
			}
		</div>
	)
}

MainView.PropTypes = {
	defaultAlbums: PropTypes.array
}

const AlbumView = (props) => {
	return (
		<div className="view"></div>
	)
}

const ArtistView = (props) => {
	const { params, chunkSize, defaultArtists, artists, Card, location } = props;

}

const Default = ({ origin, Card, chunkSize }) => {

}

const DefaultCards = ({ title, id, albums, artists, Card, chunkSize, items }) => {
	<div className="view-cards">
		<div className="view-cards-title">
			<a href='#'>{title} <i className='ion-chevron-right'></i></a>
		</div>
		{chunk(items || albums || artists, chunkSize).map((chunk, index) => (
			<Row key={`row-chunk${index}`} chunk={chunk} Card={Card} chunkSize={chunkSize} />
		))}
	</div>
}

const Row = ({ chunk, Card }) => {
	<div className="view-cards-row">
		{chunk.map(item => <Card key={item.encodeId || item.name} {...item} />)}
	</div>
}

export default MainView;
