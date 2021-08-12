const { ValidationError } = require('joi');

const { JsonWebTokenError, TokenExpiredError, NotBeforeError } = require('jsonwebtoken');

const errorMessages = {
	500: 'Internal Server Error',
	400: 'Invalid Request',
	401: 'Invalid Credentials',
	403: 'Forbidden',
	409: 'Already Exists',
};

const sendError = (error, res) => {
	const status = error.status || 500;
	const message = errorMessages[error.status] || errorMessages[500];

	res.status(status).json({
		status: 'fail',
		message,
	});
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	console.error(`Error occured here ${err}`);
	const error = err;
	if (error instanceof ValidationError) {
		error.status = 400;
	} else if (error instanceof TokenExpiredError || error instanceof NotBeforeError || error instanceof JsonWebTokenError) {
		error.status = 401;
	}
	sendError(error, res);
};
