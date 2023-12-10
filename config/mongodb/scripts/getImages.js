const admin = require('firebase-admin');
const serviceAccount = require('../../firebase/serviceAccountKey.json');
const clipboardy = require('node-clipboardy');
const mongoose = require('mongoose');
const products = require('../data/products');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://average-js-webshop.appspot.com', // Replace with your Firebase Storage bucket URL
});

// Create a reference to the Firebase Storage bucket
const bucket = admin.storage().bucket();

// Function to get all filenames in a specific folder
async function getFilenamesInFolder(folderPath) {
  try {
    const [files] = await bucket.getFiles({
      prefix: folderPath,
    });

    const filenames = files.map((file) => file.name);

    return filenames;
  } catch (error) {
    console.error('Error getting filenames:', error);
    throw error;
  }
}

async function GetFiles() {
  const folderPath = 'products';
  const filenames = await getFilenamesInFolder(folderPath);
  const ids = filenames
    .slice(1)
    .map((filename) => filename.match(/product_(.*?)_/)[1]);
  const distinctIds = [...new Set(ids)];

  for (let idx = 1; idx < products.length; idx++) {
    products[idx]._id = distinctIds[idx - 1];
    products[idx].images = [];
    products[idx].__v = undefined;
  }

  for (let i = 1; i < filenames.length; i++) {
    const filename = filenames[i];
    const bucket =
      'https://firebasestorage.googleapis.com/v0/b/average-js-webshop.appspot.com/o/';
    const url = `${bucket}${encodeURIComponent(filename)}?alt=media`;
    const id = filename.match(/product_(.*?)_/)[1];

    for (let j = 0; j < products.length; j++) {
      if (products[j]._id.toString() === id) {
        products[j].images.push(url);
      }
    }
  }

  const jsArrayString = JSON.stringify(products, null, 2);

  clipboardy.writeSync(jsArrayString);

  console.log(jsArrayString);
}

GetFiles();
