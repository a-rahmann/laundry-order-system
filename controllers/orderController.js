const storage = require('../storage');

exports.createOrder = (req, res) => {
    const { customerName, phone, items, totalAmount } = req.body;

    if (!customerName || !phone || !items || !totalAmount) {
        return res.status(400).json({ message: 'Missing required order fields' });
    }

    const newOrder = {
        orderId: `ORD-${String(storage.orders.length + 1).padStart(4, '0')}`,
        customerName,
        phone,
        items,
        totalAmount,
        status: 'RECEIVED',
        dateCreated: new Date()
    };

    storage.orders.push(newOrder);
    storage.save(); // Persist changes
    res.status(201).json(newOrder);
};

exports.getOrders = (req, res) => {
    let filteredOrders = [...storage.orders];
    const { status, customerName, phone } = req.query;

    if (status) {
        filteredOrders = filteredOrders.filter(o => o.status === status);
    }
    if (customerName) {
        filteredOrders = filteredOrders.filter(o => o.customerName.toLowerCase().includes(customerName.toLowerCase()));
    }
    if (phone) {
        filteredOrders = filteredOrders.filter(o => o.phone.includes(phone));
    }

    res.status(200).json(filteredOrders);
};

exports.updateOrderStatus = (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const order = storage.orders.find(o => o.orderId === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    storage.save(); // Persist changes
    res.status(200).json(order);
};
