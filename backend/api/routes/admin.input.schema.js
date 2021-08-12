const { Request, Response, NextFunction } = require('express');
const Joi = require('joi');

const adminSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

const getUserInputSchema = Joi.object({
	limit: Joi.number().required().min(0),
	skip: Joi.number().required().min(0),
});

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const inputAdminValidate = (req, res, next) => {
	const { body } = req;

	const validateRes = adminSchema.validate(body);
	if (validateRes.error) {
		return next(validateRes.error);
	}
	res.locals.inputData = body;
	return next();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const inputGetUserValidate = (req, res, next) => {
	const inputSchema = req.query;

	const validateRes = getUserInputSchema.validate(inputSchema);
	if (validateRes.error) {
		return next(validateRes.error);
	}
	res.locals.inputData = inputSchema;
	return next();
};

module.exports = { inputAdminValidate, inputGetUserValidate };
