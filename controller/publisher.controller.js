const User = require('../model/publisher.model');
const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}
const addPublisher = async (req, res) => {
    const { publisherName, bookName, ISBN, writerName, companyName, bio, price, category } = req.body;
    if (!publisherName || !bookName || !ISBN || !companyName || !price || !category) {
        return res.status(400).json({ message: "please fill above details" });
    }
    releasedAt = Date.now();
    const createuser = await User.create({
        publisherName,
        bookName,
        writerName,
        companyName,
        releasedAt,
        ISBN,
        bio,
        price,
        category
    });
    res.json(createuser);
}
module.exports = { addPublisher };