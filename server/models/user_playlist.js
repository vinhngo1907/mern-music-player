const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	artists: { type: Schema.Types.Mixed, required: true }, // string or array
	thumbnail: String,
	url_alias: String
}, { _id: false });

const PlaylistSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	songs: [SongSchema]
});

const UserPlaylistSchema = new Schema({
	playlist: [PlaylistSchema],
	_username: { type: String, required: true }

});

module.exports = mongoose.model('UserPlaylist', UserPlaylistSchema)
