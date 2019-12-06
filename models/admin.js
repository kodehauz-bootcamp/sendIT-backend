const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
	{
		username: {
			type: String
		},
		email: {
			type: String,
			unique: true
		},
		password: {
			type: String
		},

		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		]
	},
	{
		timestamps: true
	}
);

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
