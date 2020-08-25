const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');
const Schedule = require('../models/Schedule');

router.get('/', async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id }).populate({
    path: 'schedule',
    populate: {
      path: 'metro',
    },
  });

  res.render('tickets', { tickets });
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
      user: req.user.id,
      schedule: schedule.id,
      bookings,
    };

    const ticket = await Ticket.create(newTicket);

    res.redirect('/ticket');
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
