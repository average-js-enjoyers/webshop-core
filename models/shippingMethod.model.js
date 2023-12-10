const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShippingMethodSchema = new Schema({
  name: String,
  priceNet: Number,
  taxPercentage: Number,
});

module.exports = mongoose.model('ShippingMethod', ShippingMethodSchema);
