const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Kailangan ang pangalan ng property'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Kailangan ang kumpletong address']
  },
  rentPrice: {
    type: Number,
    required: [true, 'Kailangan ang halaga ng renta']
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Maintenance'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);