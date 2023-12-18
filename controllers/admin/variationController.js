const Variation = require('../../models/variation.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(Variation);
exports.get = factory.getOne(Variation, [{ path: 'categoryID' }]);
exports.create = factory.createOne(Variation);
exports.update = factory.updateOne(Variation);
exports.delete = factory.deleteOne(Variation);
