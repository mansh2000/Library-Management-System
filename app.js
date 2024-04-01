const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/auth.route');

const app = express();
app.use(bodyParser.json());
app.use('/api', router);
app.use(express);
module.exports = app;