const ProductItem = require('../../models/productItem.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(ProductItem);
exports.get = factory.getOne(ProductItem, [{ path: 'variations' }]);
exports.create = factory.createOne(ProductItem);
exports.update = factory.updateOne(ProductItem);
exports.delete = factory.deleteOne(ProductItem);
