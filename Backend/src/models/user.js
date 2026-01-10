const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username : {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	profilePic: {
		type: String,
		default: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
	},
	bio: {
		type: String,
		maxlength: 150,
		default: ""
	},

	followers: [{
		type: mongoose.Schema.Types.Objectid,
		ref: 'User'
	}] ,
	following: [{
		type: mongoose.Schema.Types.Objectid,
		ref: 'User'
	}] ,
	posts:[{
		type: mongoose.Schema.Types.Objectid,
		ref: 'Post'
	}],
	bookmarks: [{
		type: mongoose.Schema.Types.Objectid,
		ref: 'Post'
	}]
},{ timestamps: true});

module.exports = mongoose.model('User', userSchema);