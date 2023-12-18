const User = require('../../models/user.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(User);
exports.get = factory.getOne(User, [{ path: 'addresses' }]);
exports.create = factory.createOne(User);
exports.update = factory.updateOne(User);
exports.delete = factory.deleteOne(User);
