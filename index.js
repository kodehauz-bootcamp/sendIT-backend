const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers/index');
const User = require('./routers/user');
const Admin = require('./routers/admin');
const Contact = require('./routers/contact');
const Order = require('./routers/order');
const chalk = require('chalk');
require('./services/cache');

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(cors());

app.use('/', router);
app.use('/api/v1', [ User, Contact, Admin, Order ]);

mongoose.connect(
	process.env.DATABASE_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	function(err, client) {
		if (err) console.log(err.message);
		if (client) console.log(chalk.green.italic.inverse('Databse Connected Successsful'));
	}
);

module.exports = app;
