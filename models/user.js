const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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

	phone: {
		type: Number
	},

	address: {
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
});

const User = mongoose.model('user', userSchema);
module.exports = User;
