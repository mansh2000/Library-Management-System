const mongoose = require('mongoose');
const paymentSchema = mongoose.Schema(
    {
        email: {
            type: String
        },
        currency: {
            type: String
        },
        dateofPayment: {
            type: Date
        },
        bankName: {
            type: String
        },
        userName: {
            type: String
        },
        amount: {
            type: Number
        }
    }
);
const paymentUser = mongoose.model('payment', paymentSchema)
module.exports = paymentUser;