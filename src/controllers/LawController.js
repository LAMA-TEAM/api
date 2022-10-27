const Law = require('../models/Law');

class LawController {
    static async index(req, res) {
        try {
            const laws = await Law.find().sort({ createdAt: -1 });

            res.status(200).json({ success: true, message: 'Laws found', laws });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    static async show(req, res) {
        const { id } = req.params;
        
        try {
            const law = await Law.findById(id);

            if (!law) return res.status(404).json({ success: false, message: 'Law not found' });

            res.status(200).json({ success: true, message: 'Law found', law });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    static async store(req, res) {
        const { title, description } = req.body;

        try {
            const law = new Law({
                title,
                description,
            });

            await law.save();

            res.status(201).json({ success: true, message: 'Law created', law });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;

        try {
            const law = await Law.findById(id);

            if (!law) return res.status(404).json({ success: false, message: 'Law not found' });

            if(title) law.title = title;
            if(description) law.description = description;

            await law.save();

            res.status(200).json({ success: true, message: 'Law updated', law });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    static async destroy(req, res) {
        const { id } = req.params;

        try {
            const law = await Law.findById(id);

            if (!law) return res.status(404).json({ success: false, message: 'Law not found' });

            await law.remove();

            res.status(200).json({ success: true, message: 'Law deleted' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

module.exports = LawController;