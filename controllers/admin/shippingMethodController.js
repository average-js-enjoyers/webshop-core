const ShippingMethod = require('../../models/shippingMethod.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(ShippingMethod);
exports.get = factory.getOne(ShippingMethod);
exports.create = factory.createOne(ShippingMethod);
exports.update = factory.updateOne(ShippingMethod);
exports.delete = factory.deleteOne(ShippingMethod);
