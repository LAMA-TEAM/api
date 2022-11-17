const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Token = require('../models/Token');

class AuthMiddleware {
    static async isAuth(req, res, next) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            try {
                const isTokenValid = await Token.find({ token: bearerToken, isActive: true });

                if (isTokenValid.length <= 0) return res.status(401).json({ success: false, message: 'Invalid token' });                 

                const token = await jwt.verify(bearerToken, process.env.TOKEN_SECRET);

                req.user = token;
                req.token = bearerToken;

                next();
            } catch (error) {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        } else {
            res.status(403).json({ success: false, message: 'Forbidden' });
        }
    }

    static async isAdmin(req, res, next) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            try {
                const isTokenValid = await Token.find({ token: bearerToken, isActive: true });
                
                if (isTokenValid.length <= 0) return res.status(401).json({ success: false, message: 'Invalid token' });

                const token = await jwt.verify(bearerToken, process.env.TOKEN_SECRET);

                const user = await User.findById(token._id);

                if (user.role === 'admin') {
                    req.user = token;
                    req.token = bearerToken;
                
                    next();
                } else {
                    res.status(403).json({ success: false, message: 'Forbidden' });
                }
            } catch (error) {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        } else {
            res.status(403).json({ success: false, message: 'Forbidden' });
        }
    }
}

module.exports = AuthMiddleware;