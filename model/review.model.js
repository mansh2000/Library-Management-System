const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema(
    {
        email: {
            type: String
        },
        bookName: {
            type: String
        },
        review: {
            type: String
        },
        postDate: {
            type: Date
        }
    }
);
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;