const { Router } = require('express');
const Auth = require('./../middleware/Auth');
const { isAdmin } = require('./../middleware/isAdmin');
const { CreateAdmin, loginAdmin, adminLogout, getAdmin } = require('../controllers/admin');

const router = Router();

router.post('/admin/signup', CreateAdmin);

router.post('/admin/login', loginAdmin);

router.get('/admin', [ Auth, isAdmin ], getAdmin);

router.delete('/admin/logout', [ Auth, isAdmin ], adminLogout);

module.exports = router;
