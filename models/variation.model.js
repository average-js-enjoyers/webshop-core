const mongoose = require('mongoose');

const { Schema } = mongoose;

const Category = require('./category.model');

const VariationSchema = new Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  key: String,
  value: String,
});

module.exports = mongoose.model('Variation', VariationSchema);
