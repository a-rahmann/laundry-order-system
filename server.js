const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const pricingRoutes = require('./routes/pricingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const supportRoutes = require('./routes/supportRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static Files
app.use(express.static(__dirname)); 

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/support', supportRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
