const { ObjectId } = require('mongodb');
const clipboardy = require('node-clipboardy');

const productsOld = require('../data/productsOld');
const productsNew = require('../data/products');

for (let i = 0; i < productsNew.length; i++) {
  productsNew[i].categoryID = undefined;
  productsNew[i].name = productsOld[i].name;
  productsNew[i].description = productsOld[i].description;
  productsNew[i].category_id = productsOld[i].category_id;
}

const jsArrayString = JSON.stringify(productsNew, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);
