const User = require('../model/publisher.model');
const joi = require('joi');
const addPublisher = {
    body: joi.object().keys({
        publisherName: joi.string().required(),
        bookName: joi.string().required(),
        writerName: joi.string().required(),
        companyName: joi.string().required(),
        ISBN: joi.number().required(),
        bio: joi.string().required(),
        price: joi.number().required(),
        category: joi.string().required()
    })

};
module.exports = { addPublisher };