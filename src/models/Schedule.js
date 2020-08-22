const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  metro: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Metro',
  },
  time: {
    type: Number,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
