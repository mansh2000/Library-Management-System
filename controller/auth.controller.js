const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const dateandtime = require('date-and-time');

const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}
const register = async (req, res) => {
    const { name, email, regNum, password } = req.body;
    if (!name || !email || !password || !regNum) {
        return res.send(400).json("above fields are required");
    }

    console.log('Received password:', password);
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound)
    const createuser = await User.create({
        name,
        email,
        regNum,
        password: hashedPassword
    });

    return res.send(200).json(createuser);

};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.send(400).json({ message: "error not found" });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            res.send(400).json({ error: "password does not match" });
            return;
        }
        const payloads = {
            email,
            role: user.role
        }
        if (user && passwordMatch) {
            const secretKey = '30min';
            const generatetoken = jwt.sign(payloads, 'secret key', { expiresIn: '30min' });
            res.json(generatetoken)
        } else {
            res.status(400).json(error);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}
const otpStorage = {};
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}
const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'waliamanshu17@gmail.com',
        pass: 'aaisbefkvgtxggpm'
    }
})
const forgotpassword = async (req, res) => {
    const { email } = req.body;
    otp = generateOTP();
    const timestamp = Date.now();
    otpStorage[email] = { otp, timestamp };
    try {
        await transporter.sendMail({//aais befk vgtx ggpm
            from: 'waliamanshu17@gmail.com',
            to: email,
            subject: "otp because you forgot your password dumb bimbo",
            html: `your otp for resetting password is :${otp}`

        })
        const updateUser = await User.updateOne({ email }, { otp });
        res.status(200).json({ message: "your otp is sent successfully" })

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const storedOTP = otpStorage[email];

    if (!storedOTP) {
        return res.status(400).json({ error: 'OTP not found or has expired' });
    }

    const { otp: storedOtpValue, timestamp } = storedOTP;
    const currentTime = Date.now();
    const otpExpiryTime = 5 * 60 * 1000;

    if (otp === storedOtpValue && (currentTime - timestamp) <= otpExpiryTime) {
        delete otpStorage[email];
        return res.status(200).json({ message: 'OTP verified successfully' });
    } else if (currentTime - timestamp > otpExpiryTime) {
        delete otpStorage[email];
        return res.status(400).json({ error: 'OTP has expired' });
    } else {
        return res.status(400).json({ error: 'Invalid OTP' });
    }
};
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json(user);
};

const updateEmail = async (req, res) => {
    const { newEmail } = req.body;
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "mail not found" });
    }
    user.email = newEmail;
    await user.save();
    return res.status(201).json({ message: "Email updated successfully" });
};
module.exports = {
    register
    , login
    , forgotpassword
    , verifyOtp
    , updateEmail
    , resetPassword

};
