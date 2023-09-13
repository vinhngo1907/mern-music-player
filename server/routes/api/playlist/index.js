const express = require('express')
// controllers
const getPlaylistCollection = require('./get_playlist_collection');
const addSongToPlaylist = require('./add_song_to_playlist');
const createPlaylist = require('./create_playlist');
const getPlaylist = require('./get_playlist');
const deleteSongFromPlaylist = require('./delete_song');
const deletePlaylist = require('./delete_playlist');

const router = express.Router();

const isValidUser = (req, res, next) => {
    if (req.currentUser.username !== req.params.username) {
        return res.status(401).send('You are not allow to access this route');
    }
    return next();
}

/** 
 * @route GET
 * @desc get user playlist collection
 * @access Private
*/
router.get('/:username', isValidUser, getPlaylistCollection);

/** 
 * @route PUT 
 * @desc add a song to a playlist
 * @access Private
*/
router.put('/:username/:playlistTitle', isValidUser, addSongToPlaylist);

/**
 * @route POST playlist
 * @desc create a playlist
 * @access Private
*/
router.post('/:username', isValidUser, createPlaylist);

/** 
 * @route GET 
 * @desc get a specific playlist with title
 * @access Private
*/
router.get('/:username/:title', isValidUser, getPlaylist);

/** 
 * @route DELETE
 * @desc Delete a playlist
 * @access Private
*/
router.delete('/:username/:playlistTitle', isValidUser, deletePlaylist);

// add a song to a playlist
router.put('/:username/:playlistTitle', isValidUser, addSongToPlaylist);

/** 
 * @route DELETE
 * @desc Delete a song from a playlist
 * @access Private
*/
router.delete('/:username/:playlistTitle/:songId', isValidUser, deleteSongFromPlaylist);

module.exports = router;
