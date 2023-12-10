const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

const products = require('../data/products');
const properties = require('../data/properties');

products.forEach((product) => {
  product.properties.forEach((property) => {
    for (let i = 0; i < properties.length; i++) {
      if (property._id === properties[i]._id) {
        properties[i].category_id = product.category_id;
      }
    }
  });
});

const jsArrayString = JSON.stringify(properties, null, 2);

console.log(jsArrayString);

clipboardy.writeSync(jsArrayString);
