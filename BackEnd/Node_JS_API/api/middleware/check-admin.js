module.exports = (req, res, next) => {
    try {
        if (req.userData.role !== 'Admin') {
            return res.status(403).json({
                message: 'Access forbidden: Admins only'
            });
        }
        next(); 
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};
