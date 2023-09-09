const express = require('express')

const addSongToPlaylist = require('./add_song_to_playlist');
const createPlaylist = require('./create_playlist');

const router = express.Router();

const isValidUser = (req,res,next)=>{

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

// @route PUT api/posts
// @desc Update post
// @access Private
// router.put('/:id', verifyToken, async (req, res) => {
// 	const { title, description, url, status } = req.body

// 	// Simple validation
// 	if (!title)
// 		return res
// 			.status(400)
// 			.json({ success: false, message: 'Title is required' })

// 	try {
// 		let updatedPost = {
// 			title,
// 			description: description || '',
// 			url: (url.startsWith('https://') ? url : `https://${url}`) || '',
// 			status: status || 'TO LEARN'
// 		}

// 		const postUpdateCondition = { _id: req.params.id, user: req.userId }

// 		updatedPost = await Post.findOneAndUpdate(
// 			postUpdateCondition,
// 			updatedPost,
// 			{ new: true }
// 		)

// 		// User not authorised to update post or post not found
// 		if (!updatedPost)
// 			return res.status(401).json({
// 				success: false,
// 				message: 'Post not found or user not authorised'
// 			})

// 		res.json({
// 			success: true,
// 			message: 'Excellent progress!',
// 			post: updatedPost
// 		})
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// })

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
