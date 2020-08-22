const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  schedule: {
    ref: 'Schedule',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bookings: {
    type: Number,
  },
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
