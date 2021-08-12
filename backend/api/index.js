const config = require('../config');
const Server = require('../server');
const DbManager = require('./../repositories/db.manager');

async function main() {
	try {
		await DbManager.setup(config);
		const server = new Server(config);
		server.startServer();
		console.info('Setup completed');
	} catch (err) {
		console.error(`Error while instances setup ${err}`);
		process.exit(1);
	}
}

if (require.main === module) {
	process.on('unhandledRejection', (error) => {
		console.error('Unhandled Rejection has been occured due to this-> \n', error);
		process.exit(1);
	});
	main();
}
