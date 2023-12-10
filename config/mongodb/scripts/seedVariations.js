const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

const products = require('../data/products');
const properties = require('../data/properties');

const variations = properties.filter((p) => p.key === 'color');

const jsArrayString = JSON.stringify(variations, null, 2);

console.log(jsArrayString);

clipboardy.writeSync(jsArrayString);
