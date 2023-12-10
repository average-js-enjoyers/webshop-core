const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

const products = require('../data/products');
const variations = require('../data/variations');

const productItems = [];

// Function to generate a random integer within a specified range
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomSKU(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters.charAt(randomIndex);
  }

  return sku;
}

products.forEach((product) => {
  const catVars = variations.filter(
    (v) => v.category_id === product.category_id,
  );

  catVars.forEach((cv) => {
    const productItem = {
      _id: new ObjectId().toString(),
      product_id: product._id,
      sku: generateRandomSKU(),
      qty_in_stock: getRandomInt(0, 100),
      price_net: getRandomInt(100000, 500000),
      tax_percentage: 27,
      variations: [cv._id],
    };

    productItems.push(productItem);
  });
});

const jsArrayString = JSON.stringify(productItems, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);
