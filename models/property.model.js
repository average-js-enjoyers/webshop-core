const mongoose = require('mongoose');

const { Schema } = mongoose;

const PropertySchema = new Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  key: String,
  value: String,
});

module.exports = mongoose.model('Property', PropertySchema);
