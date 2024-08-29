
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({
                message: 'No token provided'
            });
        }

        const token = req.cookies.token;
        const jwtKey = process.env.JWT_KEY;

        if (!jwtKey) {
            return res.status(500).json({
                message: 'JWT_KEY is not defined'
            });
        }

        const decoded = jwt.verify(token, jwtKey);
        req.userData = decoded;
        console.log('Decoded token data:', req.userData);

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};

module.exports = checkAuth;
