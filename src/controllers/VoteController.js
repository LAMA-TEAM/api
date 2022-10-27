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

    static async store(req, res) {
        const { law_id } = req.params;
        const { vote } = req.body;

        try {
            const law = await Law.findById(law_id);

            if (!law) {
                return res.status(404).json({ success: false, message: 'Law not found' });
            }

            const voteExists = await Vote.findOne({ user: req.user.id, law: law_id });

            if (voteExists) {
                return res.status(400).json({ success: false, message: 'You already voted for this law' });
            }

            const newVote = new Vote({
                user: req.user.id,
                law: law_id,
                vote,
            });       

            await newVote.save();

            res.status(201).json({ success: true, message: 'Vote created', vote: newVote });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

module.exports = VoteController;