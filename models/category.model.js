const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  categoryName: String,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

module.exports = mongoose.model('Category', CategorySchema);
