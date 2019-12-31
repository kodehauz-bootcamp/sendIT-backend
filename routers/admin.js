const { Router } = require('express');
const Auth = require('./../middleware/Auth');
const { isAdmin } = require('./../middleware/isAdmin');
const { CreateAdmin, loginAdmin, adminLogout, getAdmin, getAllUsers } = require('../controllers/admin');
const clearNest = require('./../middleware/clearCache');

const router = Router();

router.post('/admin/signup', CreateAdmin);

router.post('/admin/login', loginAdmin);

router.get('/admin', [ Auth, isAdmin, clearNest ], getAdmin);

router.get('/users', [ Auth, isAdmin ], getAllUsers);

router.delete('/admin/logout', [ Auth, isAdmin ], adminLogout);

module.exports = router;
