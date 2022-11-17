const jwt = require('jsonwebtoken');

const Token = require('../models/Token');

const limitedCall = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            try {
                const isTokenValid = await Token.find({ token: bearerToken, isActive: true });

                if (isTokenValid.length <= 0) return res.status(401).json({ success: false, message: 'Invalid token' });

                if (isTokenValid[0].useLeft <= 0) return res.status(401).json({ success: false, message: 'No more calls left' });

                const updateToken = await Token.findByIdAndUpdate(isTokenValid[0]._id, { useLeft: isTokenValid[0].useLeft - 1 });

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
    

module.exports = limitedCall;