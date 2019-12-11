const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		parcel_name: {
			type: String,
			trim: true
		},

		weight: {
			type: String,
			trim: true
		},

		location: {
			type: String,
			trim: true
		},

		destination: {
			type: String,
			trim: true
		},

		phone_number: {
			type: Number,
			trim: true
		},

		status: {
			type: String
		},

		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			required: true,
			ref: 'user'
		}
	},
	{
		timestamps: true
	}
);

const Order = mongoose.model('orderTable', orderSchema);
module.exports = Order;
