const express = require('express');
const Schedule = require('../models/Schedule');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const Metro = require('../models/Metro');

router.get('/', async (req, res) => {
  const match = {};
  const { from, to, bookings = 1 } = req.query;

  if (from && to) {
    match.from = {
      $regex: from,
    };
    match.to = {
      $regex: to,
    };
  }

  try {
    const schedule = await Schedule.findOne(match).populate({
      path: 'metro',
    });

    if (!schedule) {
      return res.status(404).send({
        message: 'Schedule not found',
      });
    }

    const { metro } = schedule;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: metro.name,
              images: [metro.image],
            },
            unit_amount: `${schedule.price}00`,
          },
          quantity: bookings,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.MAIN_URL}/${schedule.id}?bookings=${bookings}`,
      cancel_url: `${process.env.MAIN_URL}/`,
    });

    res.send({ schedule, session_id: session });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: 'Something went wrong',
    });
  }
});

module.exports = router;
