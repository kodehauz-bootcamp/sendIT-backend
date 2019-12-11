const { Router } = require('express');
const Auth = require('./../middleware/Auth');
const { isUser, isAdmin } = require('./../middleware/isAdmin');
const {
	CreateOrder,
	getOneOrder,
	getUserOrders,
	updateOrder,
	deleteOrder,
	getAllOrder
} = require('../controllers/order');

const router = Router();

router.post('/create/order', [ Auth, isUser ], CreateOrder);

router.get('/getUser/Orders', [ Auth, isUser ], getUserOrders);

router.get('/getSingle/order', [ Auth, isUser ], getOneOrder);

router.get('/getAll/orders', [ Auth, isAdmin ], getAllOrder);

router.patch('/update/order', [ Auth, isUser ], updateOrder);

router.delete('/delete/order', [ Auth, isUser ], deleteOrder);

module.exports = router;
