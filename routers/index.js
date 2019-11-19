import { Router } from 'express';

import { welcomeMessage, signUP } from '../controllers/users';

const router = Router();

router.get('/', welcomeMessage);

router.post('/signup', signUP);


export default router;
