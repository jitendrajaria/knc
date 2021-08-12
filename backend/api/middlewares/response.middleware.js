// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction } = require('express');
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function responseHandler(req, res, next) {
	if (!res.locals.response) {
		return next();
	}
	return res.status(res.locals.status || 200).json({
		data: res.locals.response,
	});
}

module.exports = responseHandler;
