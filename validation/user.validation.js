const User = require('../model/user.model');
const joi = require('joi');

const register = {
    body: joi.object().keys({
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required(),
        regNum: joi.number().required()
    })

};
const login = {
    body: joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
    })
};
const forgotpassword = {
    body: joi.object().keys({
        email: joi.string().required()
    })
};
const verfiryOtp = {
    body: joi.object().keys({
        email: joi.string().required(),
        otp: joi.number().required()
    })
}
const resetPassword = {
    body: joi.object().keys({
        newPassword: joi.string().required(),
        token: joi.string().required(),
        email: joi.string().required()
    })
}
module.exports = {
    register,
    login,
    forgotpassword,
    verfiryOtp,
    resetPassword
};
