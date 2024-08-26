module.exports = (req, res, next) => {
    try {
        // `check-auth` يجب أن يتم استدعاؤه قبل `check-admin` للتحقق من صحة التوكن
        if (req.userData.role !== 'Admin') {
            return res.status(403).json({
                message: 'Access forbidden: Admins only'
            });
        }
        next(); // متابعة إلى المسار المطلوب إذا كان المستخدم أدمن
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};
