const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const shippingMethods = [];

const names = ['GLS', 'FoxPost', 'In person'];

names.forEach((name) => {
  const shippingMethod = {
    _id: new ObjectId().toString(),
    name: name,
    price_net: getRandomInt(2000, 5000),
    tax_percentage: 27,
  };
  shippingMethods.push(shippingMethod);
});

const jsArrayString = JSON.stringify(shippingMethods, null, 2);

console.log(jsArrayString);

clipboardy.writeSync(jsArrayString);
