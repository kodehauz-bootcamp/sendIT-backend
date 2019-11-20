import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routers';

dotenv.config()

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/api/v1', router);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(port, ()=>{
  console.log (`server started at ${port}`)
});
