import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
//import jwt from './_helpers/jwt';
//import errorHandler from './_helpers/error-handler';

import router from './routers/index';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use('/users', require('./models/User'));

// global error handler
//app.use(errorHandler);

app.use('/api/v1', router);


app.listen(7000, ()=>{
  console.log ('server started at 7000')
});
