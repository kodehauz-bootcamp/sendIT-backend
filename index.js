import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routers/index';
import User from './routers/user'

dotenv.config()

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

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

app.listen(port, ()=>{
  console.log (`server started at ${port}`)
});
