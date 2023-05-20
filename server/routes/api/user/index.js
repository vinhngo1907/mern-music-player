const express = require('express');
const router = express.Router();
const User = require("../../../models/user");
const jwt = require('jsonwebtoken')
const co = require("co");
const signupValidatior = require("../../../shared/validations/register");
const loginValidatior = require("../../../shared/validations/login");

/**
 * @route POST api/auth/register
 * @desc Register user
 * @access Public
*/
router.post('/register', (req, res, next) => {
	const { username, password } = req.body;

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
	const { username, password } = req.body;
	const { isValid, errors } = loginValidatior(req.body)
	if (!isValid) {
		return res.status(400).json({ error: true, errors });
	}

	co(function* () {
		const user = yield User.findOne({ username });
		if (!user) {
			const error = { status: 401, errors: { username: 'Invalid username' } };
			throw error;
		}

		const isMatch = yield user.comparePassword(password);
		if (!isMatch) {
			const error = { status: 401, errors: { password: 'Invalid password' } };
			throw error;
		}

		return user;
	}).then(user => res.json({ username: user.username, access_token: user.access_token }))
		.catch(err => next(err));
})

module.exports = router;