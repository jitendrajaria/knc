const MessageModel = require('./models/message.model');
module.exports = (() => {
	function saveMessage(messageDetails) {
		return MessageModel.create(messageDetails);
	}
	function getMessageById(id) {
		return MessageModel.findById(id).populate('from').populate('to');
	}
	function updateMessageDetails(messageDetails) {
		return messageDetails.save();
	}
	function getAllMessages(limit, skip) {
		return MessageModel.find({}, { otp: 1, isOtpSent: 1 }, { limit: limit, skip: skip, sort: { createdAt: -1 } })
			.populate('from', 'username')
			.populate('to', { firstname: 1, lastname: 1, phoneNumber: 1 });
	}
	function getCount() {
		return MessageModel.count();
	}

	function findMessageByIdAndUserId(userId, id) {
		return MessageModel.findOne({ to: userId, from: id });
	}
	return {
		saveMessage,
		getMessageById,
		updateMessageDetails,
		getAllMessages,
		getCount,
		findMessageByIdAndUserId,
	};
})();
