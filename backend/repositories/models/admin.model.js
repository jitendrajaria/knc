const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
	username: String,
	password: String,
	createdAt: { type: String, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});
AdminSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});
module.exports = mongoose.model('Admins', AdminSchema);
