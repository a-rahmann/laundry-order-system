const storage = require('../storage');

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = storage.users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword
    });
};

exports.signup = (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const exists = storage.users.find(u => u.email === email);
    if (exists) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    const newUser = {
        id: `USR-${String(storage.users.length + 1).padStart(4, '0')}`,
        name,
        email,
        password,
        phone: phone || '',
        role: 'customer'
    };

    storage.users.push(newUser);
    storage.save();

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
        message: 'Account created successfully',
        user: userWithoutPassword
    });
};

exports.updateProfile = (req, res) => {
    const { email, name, phone, address } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const user = storage.users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    storage.save();

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
        message: 'Profile updated',
        user: userWithoutPassword
    });
};
