const storage = require('../storage');

exports.getPricing = (req, res) => {
    res.status(200).json(storage.pricing);
};

exports.updatePricing = (req, res) => {
    const { type, price } = req.body;

    if (!type || price === undefined) {
        return res.status(400).json({ message: 'Type and price are required' });
    }

    storage.pricing[type] = Number(price);
    storage.save(); // Persist changes
    res.status(200).json({ message: 'Pricing updated', pricing: storage.pricing });
};
