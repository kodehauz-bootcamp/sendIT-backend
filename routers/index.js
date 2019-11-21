import { Router } from 'express';

import User from '../controllers/userController'

const router = Router();

router.get('/', function(req, res){
    res.send("Hello World");
});

router.post('/signup', User.register);
router.post('/signin', User.login)

export default router;

