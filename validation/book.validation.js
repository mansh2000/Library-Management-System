const User = require('../model/book.model');
const joi = require('joi');
const addBook = {
    body: joi.object().keys({
        bookName: joi.string().required(),
        bookId: joi.string().required(),
        publisher: joi.string().required(),
        ISBN: joi.number().required(),
        category: joi.string().required()
    })
};
const deleteBook = {
    body: joi.object().keys({
        bookName: joi.string().required()
    })
};
const issueBook = {
    body: joi.object().keys({
        category: joi.string().required()
    })
};
module.exports = {
    addBook,
    deleteBook,
    issueBook
}