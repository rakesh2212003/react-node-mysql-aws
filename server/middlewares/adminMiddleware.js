const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin'){
        return res.status(403).json({ success: false, message: 'Admin access denied' });
    }
    next();
};

export default checkAdmin;