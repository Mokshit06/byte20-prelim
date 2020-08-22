const mongoose = require('mongoose');

const MetroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

MetroSchema.virtual('schedules', {
  ref: 'Schedule',
  localField: '_id',
  foreignField: 'metro',
});

const Metro = mongoose.model('Metro', MetroSchema);

module.exports = Metro;
