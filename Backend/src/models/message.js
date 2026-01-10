const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	conversationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conversation',
		required: true
	},
	sender: {
		type: mngoose.Schema.Types.Objectid,
		ref: "User",
		required: true
	},
	text: {
		type: String,
		required: true'
		trim: true
	},
	// for sending images 
	image: {
		type: String,
		default: null
	},
	seen: {
		type: Boolean,
		default: false
	}
}, {
	timestamp: true
});

module.exports = mongoose.model('Message', messageSchema);