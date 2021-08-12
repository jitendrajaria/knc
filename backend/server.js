const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./api/middlewares/error.middleware');
const responseMiddleware = require('./api/middlewares/response.middleware');
const adminRoutes = require('./api/routes/admin.route');

class Server {
	constructor(config) {
		this.config = config;
		this.baseRoute = config.baseRoute;
		this.app = express();
		this.setup();
	}

	setup() {
		this.addMiddlewares();
	}

	addMiddlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.addRoutes();
		this.app.use(errorMiddleware);
	}

	addRoutes() {
		this.app.use(`${this.baseRoute}/admin`, adminRoutes);
		this.app.use(responseMiddleware);
		this.app.use('*', (req, res) => {
			res.status(404).json({ error: 'no route found' });
		});
	}

	startServer() {
		this.app.listen(this.config.port, () => console.log(`Web server started on route ${this.config.port}`));
	}
}
module.exports = Server;
