// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction, request } = require('express');
const { decodeJwt } = require('../../utils/jwt.util');
const AppError = require('../app.error');

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.validateJwt = (req, res, next) => {
	try {
		const { params, body } = req;
		let tokenParams = {};
		if (params.id) {
			tokenParams = params;
		} else if (body.id) {
			tokenParams = { id: body.id };
		}

		const authorization = req.headers.authorization || '';
		const [authType, token] = authorization.split(' ');

		if (!token || authType.toLowerCase() !== 'bearer') {
			throw new AppError('No Auth Token Found', 401);
		}
		res.locals.claims = decodeJwt(token, tokenParams);
		next();
	} catch (err) {
		next(err);
	}
};
