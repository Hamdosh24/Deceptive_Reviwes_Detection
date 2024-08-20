const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        console.log('Decoded token data:', req.userData); // تحقق من محتويات التوكن

        next(); // متابعة إلى الميدل وير التالي
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};
