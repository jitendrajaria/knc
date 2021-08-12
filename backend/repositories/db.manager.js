const mongoose = require('mongoose');
const faker = require('faker/locale/en_IND');
const { saveAdmin, getAllAdmins } = require('./admin.repository');
const { isRandomUsersExist, saveUser } = require('./user.repository');

module.exports = (function dbManager() {
	async function setup(config) {
		try {
			await mongoose.connect(config.mongoUri, {
				reconnectTries: 5,
				reconnectInterval: 1000,
				useNewUrlParser: true,
			});
			await createInitialAdmin();
			await createRandomUsers();
		} catch (err) {
			console.log('Error occured while setuping mongo', err);
		}
	}
	async function createInitialAdmin() {
		const admins = await getAllAdmins();
		if (admins.length == 0)
			await saveAdmin({
				username: 'admin',
				password: 'password',
			});
	}
	async function createRandomUsers() {
		const userCount = await isRandomUsersExist();
		if (userCount == 0) {
			for (let i = 0; i < 5; i++) {
				console.log('adding user ', i + 1);
				const user = {
					firstname: faker.name.firstName(),
					lastname: faker.name.lastName(),
					phoneNumber: faker.phone.phoneFormats(),
				};
				await saveUser(user);
			}
		}
	}
	return { setup };
})();
