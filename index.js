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

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(cors());

//to allow control allow origin
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	next();
// });

app.use('/', router);
app.use('/api/v1', [ User, Contact, Admin ]);

mongoose.connect(
	process.env.DATABASE_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	function(err, client) {
		if (err) console.log(err.message);
		if (client) console.log('Databse Connected Successsful');
	}
);

app.listen(PORT, () => {
	console.log(`server started at ${PORT}`);
});
