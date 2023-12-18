const Admin = require('../../models/admin.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(Admin);
exports.get = factory.getOne(Admin);
exports.create = factory.createOne(Admin);
exports.update = factory.updateOne(Admin);
exports.delete = factory.deleteOne(Admin);
