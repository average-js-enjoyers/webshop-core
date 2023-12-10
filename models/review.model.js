const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: Number,
  title: String,
  content: String,
  createdAt: Date,
  isHidden: Boolean,
});

module.exports = mongoose.model('Review', ReviewSchema);
