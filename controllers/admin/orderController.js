const Order = require('../../models/order.model');
const factory = require('../../middlewares/handlerFactory');
const OrderService = require('../../services/admin/orderService');
const OrderServiceInstance = new OrderService();

exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order, [
  { path: 'shippingAddressID' },
  { path: 'billingAddressID' },
  { path: 'shippingMethodID' },
]);
exports.createOrder = factory.createOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
