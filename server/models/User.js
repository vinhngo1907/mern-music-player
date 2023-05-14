const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-nodejs");
const getToken = require('../utils/getTokenForUser');

const userSchema = new Schema({
	username: { type: String, required: true, unique: true, maxLength: 25 },
	password: { type: String, required: true },
	access_token: { type: String }
});

userSchema.pre('save', function(next){
	const user = this;
	bcrypt.genSalt(10, (err, salt)=>{
		if(err) return next(err);

		bcrypt.hash(user.password, salt, null, (err, hash)=>{
			if(err) return next(err);

			user.password = hash;
			user.access_token = getToken(user);
			next();
		})
	})
})

module.exports = mongoose.model('users', userSchema)
