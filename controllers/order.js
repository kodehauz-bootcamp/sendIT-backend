const Order = require('../models/order');

module.exports = {
	async updateOrder(request, response) {
		//setting up validation for the keys to be updated
		const updates = Object.keys(request.body);
		const allowableOrder = [ 'description', 'completed' ];
		const isValidOrder = updates.every((update) => allowableOrder.includes(update));

		//Prompt invalid order inputs
		if (!isValidOrder) {
			return response.status(404).send(' Error: Invalid Order Input ');
		}

		const _id = request.params.id;

		//Send valid data for update
		try {
			const user = request.user;
			const updatedOrder = await Order.findOne({ _id, owner: user._id });
			if (!updatedOrder) {
				return response.status(404).send('Order not Found');
			}

			updates.forEach((update) => (updatedOrder[update] = request.body[update]));

			await updatedOrder.save();

			return response.status(200).send({
				Message: 'Update Successful',
				updatedOrder
			});
		} catch (e) {
			console.log(e);
		}
	},

	//simple testing router
	async CreateOrder(request, response) {
		const user = request.user;
		//adding the owner id to help know who created the id
		const order = new Order({
			...request.body,
			owner: user._id
		});

		try {
			const NewOrder = await order.save();
			response.status(201).send({ NewOrder });
		} catch (err) {
			response.status(400).send(err);
		}
	},

	async getOrder(request, response) {
		const match = {};
		const sort = {};

		if (request.query.completed) {
			match.completed = request.query.completed === 'true';
		}

		if (request.query.sortBy) {
			//accessing the string query to make your sorting process
			const pathSort = request.query.sortBy.split(':');
			sort[pathSort[0]] = pathSort[1] === 'desc' ? -1 : 1;
		}

		try {
			const user = request.user;
			// const tasks = await Order.find({ owner: userProfile._id })
			await user
				.populate({
					path: 'parcel_order',
					match,
					options: {
						//this is used for pagination of data pages
						limit: parseInt(request.query.limit),
						skip: parseInt(request.query.skip),
						//this new function helps to sort
						sort
					}
				})
				.execPopulate();

			response.send(user.order);
		} catch (e) {
			response.status(400).send(e);
		}
	},

	async deleteOrder(request, response) {
		const _id = request.params.id;

		try {
			const user = request.user;
			const deletedOrder = await Order.findByIdAndDelete({ _id, owner: user._id });

			if (!deletedOrder) {
				return response.status(404).send();
			}

			response.send(deletedOrder);
		} catch (e) {
			response.status(500).send(e);
		}
	},

	//This is used to read Order by id
	async getOneOrder(request, response) {
		try {
			const user = request.user;
			const _id = request.params.id;
			// const taskId = await Order.findById(_id);

			const order = await Order.findOne({ _id, owner: user._id });

			if (!order) {
				return response.status(404).send('Error: Message Not Found');
			}

			response.status(200).send({
				Message: 'The Order is Gotten successfully',
				order
			});
		} catch (e) {
			response.status(500).send(e);
		}
	}
};
