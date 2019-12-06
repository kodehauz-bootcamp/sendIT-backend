const express = require('express');
const router = express.Router();
const ContactCntroller = require('./../controllers/contact');
// const Auth = require('../middleware/Auth');

/* GET users listing. */
router.post('/contact', ContactCntroller.sendMessage);

module.exports = router;
