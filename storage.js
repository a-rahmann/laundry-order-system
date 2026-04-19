const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

const loadData = () => {
    try {
        if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error loading db.json:', err);
    }
    // Fallback if file doesn't exist or is invalid
    return {
        orders: [],
        tickets: [],
        pricing: { Shirt: 50, Pants: 80, Saree: 100 },
        users: []
    };
};

const storage = loadData();

// Add a save method to the storage object
storage.save = () => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(storage, null, 4), 'utf8');
    } catch (err) {
        console.error('Error saving to db.json:', err);
    }
};

module.exports = storage;
