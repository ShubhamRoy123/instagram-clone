const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	//Reference to the owner who created this post
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	//the url of the image (typically from aws)
	image: {
		type: String,
		required: true
	},
	caption: {
		type: String,
		trim: true,
		maxlength: 2200
	},
	// Array of User Id who likes the post
	likes:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	comments:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	location: {
		type: String,
		default: ""
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	//Automatically adds updates
	timestamps:true
});

//Indexing for faster queries
postSchema.index({ owner: 1, createdAt: -1 });

module.exports = mongoose.model('Post',postSchema);