const { Request, Response, NextFunction } = require('express');
const Vonage = require('@vonage/server-sdk');
const moment = require('moment');

const { saveMessage, getMessageById, updateMessageDetails, getAllMessages, getCount, findMessageByIdAndUserId } = require('../../repositories/message.repository');
const AppError = require('../app.error');
const config = require('../../config');

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.generateOtp = async (req, res, next) => {
	try {
		const inputData = res.locals.inputData;
		const alreadyExistsMessage = await findMessageByIdAndUserId(inputData.userId, inputData.id);
		if (alreadyExistsMessage && !alreadyExistsMessage.isOtpSent) {
			res.locals.response = { messageId: alreadyExistsMessage._id, otp: alreadyExistsMessage.otp };
			return next();
		}
		const otp = generateRandomNumber();
		const message = await saveMessage({
			to: inputData.userId,
			from: inputData.id,
			otp,
		});
		res.locals.response = { messageId: message._id, otp };
		return next();
	} catch (err) {
		console.error('Error occured while getting users ', err);
		next(err);
	}

	function generateRandomNumber() {
		return Math.floor(Math.pow(10, 5) + Math.random() * 9 * Math.pow(10, 4));
	}
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.sendMessage = async (req, res, next) => {
	function isOtpValid(message) {
		function isNotExpired() {
			return moment(message.otpSentOn).add(message.otpValidity, 's') > moment();
		}
		function isOtpHasNotBeenUsed() {
			return !message.isOtpUsed;
		}
		if (isNotExpired() && isOtpHasNotBeenUsed()) {
			return true;
		}
		return false;
	}

	try {
		const inputData = res.locals.inputData;
		const message = await getMessageById(inputData.messageId);
		if (!message) {
			throw new AppError('Message has not been generated', 403);
		}
		const date = moment();
		if (inputData.id !== message.from._id.toString() || inputData.userId !== message.to._id.toString()) {
			throw new AppError('Request with wrong user id or admin id', 403);
		}
		if (message.isOtpSent && isOtpValid(message)) {
			throw new AppError('OTP already created and sent', 409);
		}

		const vonage = new Vonage({
			apiKey: config.vonage.apiKey,
			apiSecret: config.vonage.apiSecret,
		});
		const from = config.vonage.from;
		const to = '918290695482';
		const text = `Hi! Your OTP is ${message.otp}`;

		vonage.message.sendSms(from, to, text, async (err, responseData) => {
			if (err) {
				console.log(err);
			} else {
				if (responseData.messages[0]['status'] === '0') {
					console.log('Message sent successfully.');
					message.isOtpSent = true;
					message.otpSentOn = Date.now();
					await updateMessageDetails(message);
				} else {
					console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
				}
			}
		});
		res.locals.status = 202;
		res.locals.response = { id: message.id };
		next();
	} catch (err) {
		console.error('Error occured while sending message', err);
		next(err);
	}
};

module.exports.getAllMessages = async (req, res, next) => {
	try {
		const inputData = res.locals.inputData;
		const messages = await getAllMessages(parseInt(inputData.limit), parseInt(inputData.skip));
		const count = await getCount();
		res.locals.response = { messages, count };
		next();
	} catch (err) {
		console.error('Error occured while getting all message', err);
		next(err);
	}
};
