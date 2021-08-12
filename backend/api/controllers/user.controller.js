const { Request, Response, NextFunction } = require('express');
const { getUsers } = require('../../repositories/user.repository');

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports.getUsers = async (req, res, next) => {
	try {
		const inputData = res.locals.inputData;
		const users = await getUsers(inputData.limit, inputData.skip);
		res.locals.response = users;
		next();
	} catch (err) {
		console.error('Error occured while getting users ', err);
		next(err);
	}
};
