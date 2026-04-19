const storage = require('../storage');

exports.getDashboardStats = (req, res) => {
    const totalOrders = storage.orders.length;
    const totalRevenue = storage.orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = storage.orders.filter(o => ['RECEIVED', 'PROCESSING'].includes(o.status)).length;
    const deliveredToday = storage.orders.filter(o => o.status === 'DELIVERED').length; // Basic mock for today

    res.status(200).json({
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredToday,
        activeOrders: pendingOrders + storage.orders.filter(o => o.status === 'READY').length
    });
};
