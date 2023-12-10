const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

const products = require('../data/products');
const variations = require('../data/variations');
const users = require('../data/users');
const addresses = require('../data/addresses');
const productItems = require('../data/productItems');
const shippingMethods = require('../data/shippingMethods');

function getRandomDate(startDate, endDate) {
  // Get time values in milliseconds
  const startMillis = startDate.getTime();
  const endMillis = endDate.getTime();

  // Generate a random time value within the range
  const randomMillis =
    Math.floor(Math.random() * (endMillis - startMillis + 1)) + startMillis;

  // Create a new Date object with the random time value
  const randomDate = new Date(randomMillis);

  return randomDate;
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function getRandomOrderStatus() {
  const orderStatuses = [
    'Pending',
    'On hold',
    'Cancelled',
    'Payment confirmed',
    'Processing',
    'Shipped',
    'Completed',
  ];
  const randomIndex = Math.floor(Math.random() * orderStatuses.length);

  return orderStatuses[randomIndex];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage
const randomOrderStatus = getRandomOrderStatus();
console.log(randomOrderStatus);

function getUsersRandomAddressID(user) {
  return user.addresses[getRandomInt(0, user.addresses.length - 1)];
}

function getRandomOrderLines(numOrderLines) {
  const orderLines = [];
  for (let i = 0; i < numOrderLines; i++) {
    const productItem = productItems[getRandomInt(0, productItems.length - 1)];
    const line = {
      product_item_id: productItem._id,
      qty: getRandomInt(1, 3),
      price_net: productItem.price_net,
      tax_percentage: productItem.tax_percentage,
    };
    orderLines.push(line);
  }
  return orderLines;
}

function getRandomShippingMethodID() {
  return shippingMethods[getRandomInt(0, shippingMethods.length - 1)]._id;
}

function getTotals(orderLines) {
  let order_total_net = orderLines.reduce((accumulator, orderLine) => {
    return accumulator + orderLine.price_net;
  }, 0);
  let order_total_vat = orderLines.reduce((accumulator, orderLine) => {
    return accumulator + orderLine.price_net * (orderLine.tax_percentage / 100);
  }, 0);
  order_total_vat = Math.round(order_total_vat);
  let order_total_gross = order_total_net + order_total_vat;
  return { order_total_net, order_total_vat, order_total_gross };
}

function getRandomPaymentMethod() {
  const paymentMethods = [
    'creditCard',
    'bankPreTransfer',
    'bankTransferNETTerms',
    'cashOnDelivery',
    'applePay',
    'gPay',
  ];

  const randomIndex = Math.floor(Math.random() * paymentMethods.length);

  return paymentMethods[randomIndex];
}

const orders = [];
const numOrders = 3;

users.forEach((user) => {
  for (let i = 0; i < numOrders; i++) {
    let order = {
      user_id: user._id,
      order_date: getRandomDate(new Date('2023-01-01'), new Date('2023-12-30')),
      payment_method: getRandomPaymentMethod(),
      is_paid: getRandomBoolean(),
      shipping_address_id: getUsersRandomAddressID(user),
      billing_address_id: getUsersRandomAddressID(user),
      shipping_method_id: getRandomShippingMethodID(),
      order_lines: getRandomOrderLines(getRandomInt(1, 10)),
      order_status: getRandomOrderStatus(),
    };
    const { order_total_net, order_total_vat, order_total_gross } = getTotals(
      order.order_lines,
    );
    order = { ...order, order_total_net, order_total_vat, order_total_gross };
    orders.push(order);
  }
});

const jsArrayString = JSON.stringify(orders, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);
