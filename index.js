const express = require('express');
const logger = require( 'morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routers/index');
const User = require('./routers/user');

dotenv.config()

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', router)
app.use('/api/v1', [ User]);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err, client) {
    if(err) console.log(err.message)
    if(client) console.log('Databse Connected Successsful')
  }
);

app.listen(PORT, ()=>{
  console.log (`server started at ${PORT}`)
});
