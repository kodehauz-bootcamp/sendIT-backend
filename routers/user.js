const { Router } = require('express');
const Auth = require('./../middleware/Auth');
const {
	CreateUser,
	loginUser,
	userLogout,
	getUser,
	notifyProcessing,
	notifyDelivered
} = require('../controllers/user');
const { isUser } = require('./../middleware/isAdmin');

const router = Router();

router.post('/signup', CreateUser);

router.post('/login', loginUser);

router.get('/me', [ Auth, isUser ], getUser);

router.delete('/logout', [ Auth, isUser ], userLogout);

module.exports = router;
