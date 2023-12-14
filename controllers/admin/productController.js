const Product = require('../../models/product.model');
const factory = require('../../middlewares/handlerFactory');

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, [
  { path: 'categoryID' },
  { path: 'properties' },
]);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
