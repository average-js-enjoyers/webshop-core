const Address = require('../../models/address.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(Address);
exports.get = factory.getOne(Address);
exports.create = factory.createOne(Address);
exports.update = factory.updateOne(Address);
exports.delete = factory.deleteOne(Address);
