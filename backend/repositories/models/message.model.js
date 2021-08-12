const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	to: {
		type: mongoose.Schema.ObjectId,
		ref: 'Users',
		required: true,
	},
	from: {
		type: mongoose.Schema.ObjectId,
		ref: 'Admins',
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	isOtpSent: {
		type: Boolean,
		required: true,
		default: false,
	},
	otpSentOn: {
		type: Date,
	},
	otpValidity: {
		type: Number,
		required: true,
		default: 600,
	},
	isOtpUsed: {
		type: Number,
		default: false,
	},
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

MessageSchema.pre('update', function (next) {
	this.updatedAt = Date.now();
	next();
});

module.exports = mongoose.model('Messages', MessageSchema);
