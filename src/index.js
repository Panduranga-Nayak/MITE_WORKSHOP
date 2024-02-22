var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

var express = require('express');
var app = express();
var taskRouter = require('./routers/task.js');
var userRouter = require('./routers/user.js');



require('./db/mysql');

const port = process.env.PORT;

app.use(express.json());

app.use(taskRouter);
app.use(userRouter);

app.listen(port, function () {
  console.log('Your port is up at', port);
});