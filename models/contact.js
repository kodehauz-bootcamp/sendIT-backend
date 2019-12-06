const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},

		email: {
			type: String,
			required: true
		},

		phone_number: {
			type: Number
		},

		subject: {
			type: String,
			required: true
		},

		content: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Contact = mongoose.model('ContactTable', ContactSchema);
module.exports = Contact;
