const express = require('express');
const Schedule = require('../models/Schedule');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const randomLocation = require('random-location');

router.get('/', async (req, res) => {
  const match = {};
  const { from, to, bookings = 1 } = req.query;

  if (from && to) {
    match.from = {
      $regex: from,
      $options: 'i',
    };
    match.to = {
      $regex: to,
      $options: 'i',
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
      success_url: `${process.env.MAIN_URL}/ticket/create?schedule=${schedule.id}&bookings=${bookings}`,
      cancel_url: `${process.env.MAIN_URL}/`,
    });

    const coords = randomLocation.randomCirclePoint(
      {
        latitude: 0,
        longitude: 40,
      },
      8000000
    );

    res.send({ schedule, coords, session_id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: 'Something went wrong',
    });
  }
});

//todo Remove from prod
const Metro = require('../models/Metro');
router.get('/create', async (req, res) => {
  const metro = await Metro.create({
    name: 'Metro 1',
    image:
      'https://res.cloudinary.com/dzqjbkm5q/image/upload/v1598107778/byte_metro/metro_qsbp6b.jpg',
  });

  const schedule = await Schedule.create({
    metro: metro.id,
    time: 7,
    from: 'Delhi',
    to: 'Noida',
    price: 100,
  });

  res.send(schedule);
});

module.exports = router;
