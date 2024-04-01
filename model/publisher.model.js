const mongoose = require('mongoose');
const publisherSchema = mongoose.Schema(
    {
        publisherName: {
            type: String
        },
        bookName: {
            type: String
        },
        company: {
            type: String
        },
        writerName: {
            type: String
        },
        category: {
            type: String
        },
        releasedAt: {
            type: Date
        },
        ISBN: {
            type: Number
        },
        bio: {
            type: String
        },
        price: {
            type: Number
        }
    });
const publishUser = mongoose.model('publisher', publisherSchema);
module.exports = publishUser;