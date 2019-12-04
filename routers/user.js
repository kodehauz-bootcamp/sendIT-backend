const { Router } = require('express');
const Auth = require('./../middleware/Auth');
const { CreateUser, loginUser, userLogout, getUser } = require('../controllers/user');

const router = Router();

router.post('/signup', CreateUser );

router.post('/login', loginUser );

router.get('/me', Auth, getUser );

router.delete('/logout', Auth, userLogout );

export default router;