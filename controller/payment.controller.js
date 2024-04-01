const User = require('../model/user.model');
const environment = require('../config/environment')
const stripe = require('stripe')(environment.stripeSecretKey);
const payment = require('../model/payment.model')
const dateandtime = require('date-and-time');
const catchAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}
const addPayment = async (req, res) => {
  try {
    const { amount, userName, email, bankName } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: 'pm_card_visa'
    });
    const createuser = await payment.create({
      userName,
      email,
      amount,
      bankName,
      dateofPayment: Date.now()
    })
    res.status(200).json({
      message: 'Payment created successfully',
      paymentIntent: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating Payment:', error);
    res.status(500).json({ error: 'Payment creation failed' });
  }
};

module.exports = { addPayment };


