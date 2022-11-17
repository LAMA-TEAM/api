const Token = require('../models/Token');

class TokenController {
    static async index(req, res) {
        const userId = req.user._id;

        try {
            const tokens = await Token.find({ user: userId });

            return res.status(200).json({ success: true, tokens: tokens });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server error' });
        }

    }

    static async refreshToken(req, res) {
        const { token } = req.params;

        try {
            const isTokenValid = await Token.find({ _id: token, isActive: true, user: req.user._id });

            if (isTokenValid.length <= 0) return res.status(401).json({ success: false, message: 'Invalid token' });

            
            const updateToken = await Token.findByIdAndUpdate(isTokenValid[0]._id, { useLeft: 50 });
            
            updateToken.save();

            return res.status(200).json({ success: true, message: 'Token refreshed' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    static async destroy(req, res) {
        const { token } = req.body;

        try {
            const isTokenValid = await Token.find({ token, isActive: true, user: req.user});

            if (isTokenValid.length <= 0) return res.status(401).json({ success: false, message: 'Invalid token' });

            const updateToken = await Token.findByIdAndUpdate(isTokenValid[0]._id, { isActive: false });

            return res.status(200).json({ success: true, message: 'Token destroyed' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

module.exports = TokenController;