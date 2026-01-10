const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
	//user recieve notification
	recipient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	// user who trigger notification
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	// type of activity
	type: {
		type: String,
		enum: ['like', 'comment', 'follow', 'mention'],
		required: true
	},
	//like to the specific post
	content: {
		type: String,
		default: ''
	},
	isRead: {
		type: Boolean,
		default: false
	}
},{ timestamp: true
});

//make response fater
notificationSchema.index({ recipient: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
