const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');

router.get('/', async (req, res) => {
  //! Change to req.user.id
  const tickets = await Ticket.find({ user: '5f412501deeadd5d6cf85adf' });

  res.send(tickets);
});

router.get('/create', async (req, res) => {
  const { bookings, schedule: scheduleId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
    return res.status(404).send({
      message: 'Schedule not found',
    });
  }

  try {
    const schedule = await Schedule.findById(scheduleId);

    if (!schedule) {
      return res.status(404).send({
        message: 'Schedule not found',
      });
    }

    const newTicket = {
      //! Change to req.user.id
      user: '5f412501deeadd5d6cf85adf',
      schedule: schedule.id,
      bookings,
    };

    const ticket = await Ticket.create(newTicket);

    res.status(201).send(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
