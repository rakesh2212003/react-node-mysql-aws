import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Access denied' });
            }
            req.id = id;
            next();
        });
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({ error: 'Internal server error' });
    }
}

export default verifyToken;