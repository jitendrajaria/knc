const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	port: process.env.PORT || 8003,
	env: process.env.NODE_ENV || 'development',
	baseRoute: '/api/v1',
	tokenValidator: {
		algorithms: process.env.JWT_ALGORITHM || 'RS256',
		audience: process.env.JWT_AUDIENCE || 'kn:auth-client',
		issuer: process.env.JWT_ISSUER || 'kn:auth',
		expiresIn: process.env.JWT_EXPIRE || '24h',
		publicKeyFileName: 'public.key',
		privateKeyFileName: 'private.key',
	},
	mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
	vonage: {
		apiKey: '62d479e5',
		apiSecret: '7y7JxbGk121dDg50',
		from: 'KNTEST',
		toNumber: process.env.VONAGE_TO_NUMBER || '918290695482',
	},
};
