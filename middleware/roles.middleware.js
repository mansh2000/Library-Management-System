const jwt = require('jsonwebtoken');
// Middleware to check if user is an admin
const isAdmin = (admin) => async (req, res, next) => {
    if (admin !== req.user.role) {
        return res.status(403).json({ message: 'forbidden' });
    }
    next();
};

module.exports = { isAdmin };
