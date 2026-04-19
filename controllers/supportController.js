const storage = require('../storage');

exports.createTicket = (req, res) => {
    const { customerName, subject, message } = req.body;

    if (!customerName || !subject || !message) {
        return res.status(400).json({ message: 'Name, subject, and message are required' });
    }

    const newTicket = {
        ticketId: `TKT-${String(storage.tickets.length + 1).padStart(3, '0')}`,
        customerName,
        subject,
        message,
        status: 'OPEN'
    };

    storage.tickets.push(newTicket);
    storage.save(); // Persist changes
    res.status(201).json(newTicket);
};

exports.getTickets = (req, res) => {
    res.status(200).json(storage.tickets);
};

exports.updateTicketStatus = (req, res) => {
    const { ticketId } = req.params;
    const { status } = req.body;

    const ticket = storage.tickets.find(t => t.ticketId === ticketId);
    if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = status;
    storage.save(); // Persist changes
    res.status(200).json(ticket);
};
