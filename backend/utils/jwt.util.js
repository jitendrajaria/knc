const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const config = require('../config');

const jwtOptions = {
	issuer: config.tokenValidator.issuer,
	expiresIn: config.tokenValidator.expiresIn,
	algorithm: config.tokenValidator.algorithms,
	audience: config.tokenValidator.audience,
};

function encodeJwt(payload, params = {}) {
	const privateKey = fs.readFileSync(path.resolve(__dirname, `../keys/${config.tokenValidator.privateKeyFileName}`), 'utf-8');
	if (Object.keys(params).length !== 0 && params.id) jwtOptions.subject = `${params.id}`;
	const token = jwt.sign(payload, privateKey, jwtOptions);
	return token;
}

function decodeJwt(token, params = {}) {
	const decodeJwtOption = { ...jwtOptions };
	if (Object.keys(params).length !== 0 && params.id) decodeJwtOption.subject = params.id;
	const publicKey = fs.readFileSync(path.resolve(__dirname, `../keys/${config.tokenValidator.publicKeyFileName}`), 'utf-8');
	decodeJwtOption.algorithms = config.tokenValidator.algorithms;
	const claims = jwt.verify(token, publicKey, decodeJwtOption);
	return claims;
}

module.exports = {
	decodeJwt,
	encodeJwt,
};
