const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');

router.post('/', supportController.createTicket);
router.get('/', supportController.getTickets);
router.patch('/:ticketId', supportController.updateTicketStatus);

module.exports = router;
