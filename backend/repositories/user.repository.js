const UserModel = require('./models/user.model');

module.exports = (() => {
	function saveUser(userInfo) {
		return UserModel.create({ ...userInfo });
	}

	function getUsers(limit, skip) {
		return UserModel.find(
			{},
			{ firstname: 1, lastname: 1, phoneNumber: 1 },
			{
				skip: parseInt(skip),
				limit: parseInt(limit),
			}
		);
	}

	async function isRandomUsersExist() {
		return await UserModel.find({}, { limit: 5 });
	}

	return {
		saveUser,
		getUsers,
		isRandomUsersExist,
	};
})();
