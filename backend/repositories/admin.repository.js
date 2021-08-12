const AdminModel = require('./models/admin.model');

module.exports = (() => {
	function saveAdmin(adminInfo) {
		return AdminModel.create({ ...adminInfo });
	}
	function findAdminById(id) {
		return AdminModel.findById(id);
	}
	function findAdminByUsername(username) {
		return AdminModel.findOne({ username });
	}
	function getAllAdmins() {
		return AdminModel.find();
	}
	return {
		saveAdmin,
		findAdminById,
		findAdminByUsername,
		getAllAdmins,
	};
})();
