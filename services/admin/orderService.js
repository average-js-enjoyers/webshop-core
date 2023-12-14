const Order = require('../../models/order.model');
const ProductItem = require('../../');

class OrderService {
  constructor() {}

  async createOne(orderToCreate) {
    return await Order.create(orderToCreate);
  }
}

module.exports = OrderService;
