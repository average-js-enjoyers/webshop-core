const Review = require('../../models/review.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(Review);
exports.get = factory.getOne(Review, [{ path: 'userID' }]);
exports.create = factory.createOne(Review);
exports.update = factory.updateOne(Review);
exports.delete = factory.deleteOne(Review);
