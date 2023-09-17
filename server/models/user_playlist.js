const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	artists: { type: Schema.Types.Mixed, required: true }, // string or array
	thumbnail: String,
	url_alias: String,
}, { _id: false, versionKey: false });

const ScheduledPlaytimeSchema = new Schema({
	time: { type: String, required: true }, // Store scheduled time as a string (e.g., "14:30")
	days: [String], // Store the days of the week when the playlist should play (e.g., ["Monday", "Wednesday"])
}, { _id: false, versionKey: false });

const PlaylistSchema = new Schema({
	songs: [SongSchema],
	title: { type: String, required: true },
	scheduledPlaytimes: [ScheduledPlaytimeSchema],
}, { versionKey: false });

const UserPlaylistSchema = new Schema({
	playlists: [PlaylistSchema],
	_username: { type: String, required: true },
}, { versionKey: false });

const Playlist = mongoose.model('UserPlaylist', UserPlaylistSchema);

module.exports = Playlist;