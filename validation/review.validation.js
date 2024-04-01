const User = require('../model/review.model');
const joi = require('joi');
const postReview = {
    body: joi.object().keys({
        email: joi.string().required(),
        bookName: joi.string().required(),
        review: joi.string().required(),

    })
};
module.exports = { postReview };