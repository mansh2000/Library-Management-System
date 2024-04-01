const mongoose = require('mongoose');
const bookSchema = mongoose.Schema(
    {
        bookName: {
            type: String
        },
        bookId: {
            type: String
        },
        publisher: {
            type: String
        },
        ISBN: {
            type: Number
        },
        releasedDate: {
            type: Date
        },
        category: {
            type: String
        }
    });
const bookUser = mongoose.model('book', bookSchema);
module.exports = bookUser;