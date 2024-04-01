const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        regNum: {
            type: Number,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ['admin', 'student'],
            default: 'student'
        }

    }
)
const User = mongoose.model('user', userSchema);
module.exports = User;