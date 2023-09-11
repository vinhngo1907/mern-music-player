const express = require('express')

const addSongToPlaylist = require('./add_song_to_playlist');
const createPlaylist = require('./create_playlist');
const getPlaylist = require('./get_playlist');
const deleteSongFromPlaylist = require('./delete_song');
// const addSongToPlaylist = require('./add_song_to_playlist');

const router = express.Router();

const isValidUser = (req, res, next) => {
    if (req.currentUser.username) {
        return res.status(401).send('You are not allow to access this route');
    }
    return next();
}

/** 
 * @route GET api/posts
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

// @route DELETE api/posts
// @desc Delete post
// @access Private
// router.delete('/:id', verifyToken, async (req, res) => {
// 	try {
// 		const postDeleteCondition = { _id: req.params.id, user: req.userId }
// 		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

// 		// User not authorised or post not found
// 		if (!deletedPost)
// 			return res.status(401).json({
// 				success: false,
// 				message: 'Post not found or user not authorised'
// 			})

// 		res.json({ success: true, post: deletedPost })
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// })

module.exports = router;
