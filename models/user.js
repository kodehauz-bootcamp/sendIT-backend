const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
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

		phone: {
			type: Number
		},

		address: {
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
userSchema.virtual('parcel_order', {
	ref: 'parcel_order',
	localField: '_id',
	foreignField: 'owner'
});

const User = mongoose.model('user', userSchema);
module.exports = User;
