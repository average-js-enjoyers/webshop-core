const Property = require('../../models/property.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(Property);
exports.get = factory.getOne(Property, [{ path: 'categoryID' }]);
exports.create = factory.createOne(Property);
exports.update = factory.updateOne(Property);
exports.delete = factory.deleteOne(Property);
