const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const environment = require('./config/environment');
const app = require('./app');
app.use(bodyParser.json());
const port = 3000;


mongoose.connect(environment.mongodbUri, {
    useNewUrlParser: true
}).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err.message);
})
app.listen(port, () => {
    console.log(`server running on port${port}`);
})



