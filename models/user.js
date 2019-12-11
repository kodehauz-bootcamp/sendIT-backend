const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		full_name: {
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

		image: {
			type: String
		},

		role: {
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

//using virtual to create a relationship between user and owned directories
userSchema.virtual('orders', {
	ref: 'orderTable',
	localField: '_id',
	foreignField: 'ownerId'
});

const User = mongoose.model('user', userSchema);
module.exports = User;
