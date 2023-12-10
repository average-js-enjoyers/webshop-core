const Order = require('../../models/order.model');
const factory = require('../handlerFactory');

exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order, [
  { path: 'shippingAddressID' },
  { path: 'billingAddressID' },
  { path: 'shippingMethodID' },
]);
exports.createOrder = factory.createOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
