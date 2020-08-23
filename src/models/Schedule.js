const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  metro: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Metro',
  },
  time: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
