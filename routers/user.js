import { Router } from 'express';

import { CreateUser } from '../controllers/user';

const router = Router();

router.post('/signup', CreateUser );

export default router;