const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '',
    method: '',
    headers: {
        'Content-Type': 'application/json'
    }
};

async function testEndpoint(path, method, body = null) {
    return new Promise((resolve, reject) => {
        const reqOptions = { ...options, path, method };
        const req = http.request(reqOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({ status: res.statusCode, data: JSON.parse(data) });
            });
        });
        req.on('error', (err) => reject(err));
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function runTests() {
    console.log('--- Verification Started ---');
    try {
        // 1. Auth Login
        const auth = await testEndpoint('/api/auth/login', 'POST', { email: 'test@example.com', password: 'password123' });
        console.log('POST /api/auth/login:', auth.status === 200 ? 'SUCCESS' : 'FAILED', auth.data.message);

        // 2. Get Dashboard
        const dash = await testEndpoint('/api/dashboard', 'GET');
        console.log('GET /api/dashboard:', dash.status === 200 ? 'SUCCESS' : 'FAILED', `Total Orders: ${dash.data.totalOrders}`);

        // 3. Create Order
        const newOrder = await testEndpoint('/api/orders', 'POST', {
            customerName: 'Test User',
            phone: '1234567890',
            items: [{ type: 'Shirt', quantity: 1, price: 50 }],
            totalAmount: 50
        });
        console.log('POST /api/orders:', newOrder.status === 201 ? 'SUCCESS' : 'FAILED', `ID: ${newOrder.data.orderId}`);

        // 4. Update Status
        const update = await testEndpoint(`/api/orders/${newOrder.data.orderId}/status`, 'PATCH', { status: 'PROCESSING' });
        console.log(`PATCH /api/orders/${newOrder.data.orderId}/status:`, update.status === 200 ? 'SUCCESS' : 'FAILED', `New Status: ${update.data.status}`);

        // 5. Get Pricing
        const pricing = await testEndpoint('/api/pricing', 'GET');
        console.log('GET /api/pricing:', pricing.status === 200 ? 'SUCCESS' : 'FAILED', `Shirt: ${pricing.data.Shirt}`);

        // 6. Update Pricing
        const upPricing = await testEndpoint('/api/pricing', 'PUT', { type: 'Shirt', price: 60 });
        console.log('PUT /api/pricing:', upPricing.status === 200 ? 'SUCCESS' : 'FAILED', `New Shirt Price: ${upPricing.data.pricing.Shirt}`);

        // 7. Support
        const ticket = await testEndpoint('/api/support', 'POST', { customerName: 'Test User', subject: 'Inquiry', message: 'Hello' });
        console.log('POST /api/support:', ticket.status === 201 ? 'SUCCESS' : 'FAILED', `ID: ${ticket.data.ticketId}`);

        const tickets = await testEndpoint('/api/support', 'GET');
        console.log('GET /api/support:', tickets.status === 200 ? 'SUCCESS' : 'FAILED', `Count: ${tickets.data.length}`);

        console.log('--- Verification Completed ---');
        process.exit(0);
    } catch (err) {
        console.error('Test Failed:', err.message);
        process.exit(1);
    }
}

// Wait for server to start
setTimeout(runTests, 2000);
