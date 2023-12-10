const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductItemSchema = new Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  sku: String,
  qtyInStock: Number,
  priceNet: Number,
  taxPercentage: Number,
  variations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Variation',
    },
  ],
});

module.exports = mongoose.model('ProductItem', ProductItemSchema);
