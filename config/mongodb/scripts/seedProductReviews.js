const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const clipboardy = require('node-clipboardy');

const products = require('../data/products');
const reviews = require('../data/reviews');

reviews.forEach((r) => {
  const index = faker.number.int({ min: 0, max: products.length });
  const product = products[index];
  if (product.reviews === undefined) {
    product.reviews = [];
  }

  product.reviews.push(r._id);
  products[index] = product;
});

const jsArrayString = JSON.stringify(products, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);
