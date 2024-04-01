const User = require('../model/payment.model');
const joi = require('joi');
const addPayment = {
    body: joi.object().keys({
        userName: joi.string().required(),
        email: joi.string().required(),
        amount: joi.number().required(),
    })
};
module.exports = { addPayment };