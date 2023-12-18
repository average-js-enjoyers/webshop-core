const Category = require('../../models/category.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAll = factory.getAll(Category);
exports.get = factory.getOne(Category, [{ path: 'parentCategory' }]);
exports.create = factory.createOne(Category);
exports.update = factory.updateOne(Category);
exports.delete = factory.deleteOne(Category);
