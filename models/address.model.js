const mongoose = require('mongoose');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  city: String,
  region: String,
  vatID: String,
  type: String,
  isActive: Boolean,
  company: String,
  addressLine: String,
  zip: String,
  name: String,
  country: String,
  phoneNumber: String,
});

module.exports = mongoose.model('Address', AddressSchema);
