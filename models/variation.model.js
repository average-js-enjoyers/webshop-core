const mongoose = require('mongoose');

const { Schema } = mongoose;

const VariationSchema = new Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variation',
  },
  key: String,
  value: String,
});

module.exports = mongoose.model('Variation', VariationSchema);
