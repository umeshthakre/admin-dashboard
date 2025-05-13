// jwtUtils.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY // ✅ Use env vars in production

export function generateToken(payload, expiresIn = '1d') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Invalid token');
            console.log(err)
            return res.status(403).json({ message: 'Invalid token' })
        };

        req.user = user; // Attach decoded token to request
        next();
    });
}