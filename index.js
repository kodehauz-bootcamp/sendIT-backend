import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import router from './routers';

dotenv.config()

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/api/v1', router);


app.listen(7000, ()=>{
  console.log ('server started at 7000')
});
