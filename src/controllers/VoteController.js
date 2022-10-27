const Law = require('../models/Law');
const Vote = require('../models/Vote');

class VoteController {
    static async index(req, res) {
        const { law_id } = req.params;

        try {
            const votes = await Vote.find({ law: law_id });

            res.status(200).json({ success: true, message: 'Votes found', votes });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

module.exports = VoteController;