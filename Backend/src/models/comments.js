const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	// user who comment
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	},
	// the user who Comment
	author: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	text: {
		type: String,
		required: true,
		trim: true,
		maxlength: 1000
	},
	// Array of Users who liked this specifis comment
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	parentComment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		default: null
	}
});

commentSchema.index({ postId: 1, createdAt: -1 });

module.exports = mongoose.model('Comment',commentSchema);