const { Request, Response, NextFunction } = require('express');
const Joi = require('joi');

const getOtpSchema = Joi.object({
	id: Joi.string().required(),
	userId: Joi.string().required(),
});

const postMessageSchema = Joi.object({
	messageId: Joi.string().required(),
	id: Joi.string().required(),
	userId: Joi.string().required(),
});

const getAllMessagesSchema = Joi.object({
	limit: Joi.number().required().min(0),
	skip: Joi.number().required().min(0),
});

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getOtpInputValidate = (req, res, next) => {
	const inputSchema = req.params;

	const validateRes = getOtpSchema.validate(inputSchema);
	if (validateRes.error) {
		return next(validateRes.error);
	}
	res.locals.inputData = inputSchema;
	return next();
};

const postMessageInputValidate = (req, res, next) => {
	const inputSchema = { ...req.body, ...req.params };

	const validateRes = postMessageSchema.validate(inputSchema);
	if (validateRes.error) {
		return next(validateRes.error);
	}
	res.locals.inputData = inputSchema;
	return next();
};

const getAllMessageInputValidate = (req, res, next) => {
	const inputSchema = { ...req.query };

	const validateRes = getAllMessagesSchema.validate(inputSchema);
	if (validateRes.error) {
		return next(validateRes.error);
	}
	res.locals.inputData = inputSchema;
	return next();
};

module.exports = { getOtpInputValidate, postMessageInputValidate, getAllMessageInputValidate };
