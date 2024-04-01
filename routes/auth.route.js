const express = require('express');

const authValidation = require('../validation/user.validation');
const publishValidation = require('../validation/publisher.validation');
const reviewValidation = require('../validation/review.validation');
const bookValidation = require('../validation/book.validation');
const paymentValidation = require('../validation/payment.validation');

const authController = require('../controller/auth.controller');
const bookController = require('../controller/books.controller');
const publishController = require('../controller/publisher.controller');
const reviewController = require('../controller/review.controller');
const paymentController = require('../controller/payment.controller');

const { userAuthentication } = require('../middleware/auth.middleware');
const { verifyToken, isAdmin } = require('../middleware/roles.middleware');
const validator = require('../validation/index');
let router = express.Router();

router.post('/register', validator(authValidation.register), authController.register);
router.post('/login', validator(authValidation.login), authController.login);
router.post('/forgotpassword', validator(authValidation.forgotpassword), authController.forgotpassword);
router.post('/verifyOtp', validator(authValidation.verfiryOtp), authController.verifyOtp);
router.put('/updateEmail', userAuthentication, isAdmin('admin'), authController.updateEmail);
router.put('/resetPassword', userAuthentication, authController.resetPassword);
router.get('/issueBook', validator(bookValidation.issueBook), bookController.issueBook);
router.post('/addBook', validator(bookValidation.addBook), isAdmin('admin'), bookController.addBook);
router.post('/deleteBook', validator(bookValidation.deleteBook), isAdmin('admin'), bookController.deleteBook);
router.post('/postReview', validator(reviewValidation.postReview), reviewController.postReview);
router.post('/addPublisher', validator(publishValidation.addPublisher), publishController.addPublisher);
router.post('/addPayment', validator(paymentValidation.addPayment), paymentController.addPayment);

module.exports = router;