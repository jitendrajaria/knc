const { Request, Response, NextFunction } = require('express');
const bcrypt = require('bcrypt');
const adminRepository = require('../../repositories/admin.repository');
const AppError = require('../app.error');
const { encodeJwt } = require('../../utils/jwt.util');

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.adminLogin = async (req, res, next) => {
	const loginDetails = res.locals.inputData;
	try {
		const admin = await adminRepository.findAdminByUsername(loginDetails.username);
		if (!admin) {
			throw new AppError('User not found', 401);
		}

		const match = bcrypt.compareSync(loginDetails.password, admin.password);
		if (!match) {
			throw new AppError('Password does not match', 401);
		}
		const token = encodeJwt({ username: loginDetails.username }, { id: admin._id });
		res.locals.response = { token, id: admin._id };
		next();
	} catch (err) {
		console.log('Error occured in Admin Controller while login', err);
		next(err);
	}
};
