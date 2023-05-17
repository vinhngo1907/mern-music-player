const express = require('express');
const User = require("../../../models/user");
const jwt = require('jsonwebtoken')
const co = require("co");
const signupValidatior = require("../../../shared/validations/register");

/** 
 *  @route GET api/auth
 * @desc Check if user is logged in
 * @access Public
*/
router.post('/register', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

/**
 * @route POST api/auth/register
 * @desc Register user
 * @access Public
*/
router.post('/register', (req, res, next) => {
	const { username, password } = req.body
	const { isValid, errors } = signupValidatior(req.body);

	if (!isValid) {
		return res.status(400).json({ error: true, errors });
	}

	co(function* () {
		const existingUser = yield User.findOne({ username });

		if (existingUser) {
			const error = { status: 400, errors: { username: 'Username already exist' } }
			throw error;
		}

		const user = new User({ username, password });
		return user.save();
	}).then(user => res.json({
		username: user.username,
		access_token: user.access_token
	})).catch(err => next(err));
});

/**
 * @route POST api/auth/login
 * @desc Login user
 * @access Public
*/
router.post('/login', async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// Username found
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router
