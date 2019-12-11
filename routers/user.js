const { Router } = require('express');
const Auth = require('./../middleware/Auth');
const { CreateUser, loginUser, userLogout, getUser, updateUserAccount, uploadImage } = require('../controllers/user');
const upload = require('./../services/upload');
const { isUser } = require('./../middleware/isAdmin');

const router = Router();

router.post('/signup', CreateUser);

router.patch('/user/avatar', [ upload.single('avatar'), Auth, isUser ], uploadImage);

router.post('/login', loginUser);

router.get('/me', [ Auth, isUser ], getUser);

router.patch('/update/user/:id', [ Auth, isUser ], updateUserAccount);

router.delete('/logout', [ Auth, isUser ], userLogout);

module.exports = router;
