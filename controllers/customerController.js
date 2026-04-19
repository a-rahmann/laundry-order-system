const storage = require('../storage');

exports.getCustomers = (req, res) => {
    // Extract unique customers from orders
    const customersMap = new Map();
    
    storage.orders.forEach(order => {
        if (!customersMap.has(order.phone)) {
            customersMap.set(order.phone, {
                name: order.customerName,
                phone: order.phone,
                totalOrders: 0,
                totalSpent: 0
            });
        }
        const customer = customersMap.get(order.phone);
        customer.totalOrders += 1;
        customer.totalSpent += order.totalAmount;
    });

    const customers = Array.from(customersMap.values());
    res.status(200).json(customers);
};
