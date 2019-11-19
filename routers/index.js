import { Router } from 'express';

import { welcomeMessage } from '../controllers';

const router = Router();

router.get('/', welcomeMessage);

export default router;
