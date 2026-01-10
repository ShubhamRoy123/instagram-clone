const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
	//Array of User Id involved in the chat 
	participants: [{
		type: mongoose.Schema.Types.ObjectId,
		ref:'User',
		required: true
	}],
	//message
	lastmessage: {
		text: String,
		sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		seen: { type: Boolean, default: false }
	},
	// Useful if you want to support Group Chats later
	isGroupchat: {
		type: Boolean,
		default: false
	},
	groupName: {
		type: String,
		default:""
	}
},{
 timestamps: true //track upadate
});

//Optimization: instant response
conversationSchema.index({ participants: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);		 