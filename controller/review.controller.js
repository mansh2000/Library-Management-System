const User = require('../model/user.model');
const Review = require('../model/review.model');
const dateAndTime = require('date-and-time');

const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

const postReview = async (req, res) => {
    const { email, review, bookName } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const postDate = dateAndTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

        try {
            const createReview = await Review.create({
                email,
                bookName,
                review,
                postDate
            });

            res.json(createReview);
        } catch (error) {
            console.error('Error creating review:', error);
            res.status(500).json({ error: 'Failed to post review' });
        }
    } else {
        return res.status(400).json({ message: "Please sign in to post a review" });
    }
};

module.exports = {
    postReview
};
