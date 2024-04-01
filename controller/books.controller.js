const User = require('../model/book.model');
const dateandtime = require('date-and-time');
const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}
const addBook = async (req, res) => {
    let { bookName, bookId, publisher, ISBN, category } = req.body;
    if (!bookName || !bookId || !publisher || !ISBN || !category) {
        res.status(400).json({ message: "please fill the above fields to add book" });
    }
    const dateandtime = Date.now();
    const releasedDate = dateandtime;
    const createuser = await User.create({
        bookName,
        bookId,
        publisher,
        ISBN,
        releasedDate,
        category
    });
    res.send(200).json(createuser);
}
const issueBook = async (req, res) => {
    const { category } = req.body;
    try {
        const books = await User.find({ category });
        if (books) {
            return res.status(200).json({ message: books });

        } else {
            return res.status(400).json({ message: "No books found in the category" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
const deleteBook = async (req, res) => {
    const { bookName } = req.body;
    try {
        const books = await User.deleteOne({ bookName });
        return res.status(200).send(books);
    } catch (error) {
        console.log("hello error");
        return res.status(400).json({ error: error.message });
    };
};

module.exports = {
    addBook,
    issueBook,
    deleteBook
};
