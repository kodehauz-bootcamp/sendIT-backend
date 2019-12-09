const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		parcel_name: {
			type: String
		},

		weight: {
			type: String
		},

		location: {
			type: String
		},

		destination: {
			type: Number
		},

		phone_number: {
			type: String
		},

		owner: {
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

const Order = mongoose.model('parcel_order', orderSchema);
module.exports = Order;
