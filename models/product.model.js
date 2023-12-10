const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  name: String,
  description: String,
  images: [String],
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

module.exports = mongoose.model('Product', ProductSchema);
