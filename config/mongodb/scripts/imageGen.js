const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const products = require('./../data/products');

// Create a directory to store the generated images
const outputDirectory = './../images/products';
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Number of products and images per product
const imagesPerProduct = 3;
const resolutions = [
  {
    width: 500,
    height: 375,
  },
  {
    width: 1000,
    height: 750,
  },
  {
    width: 2000,
    height: 1500,
  },
];
// img

// Function to generate and save images
const generateImages = async () => {
  for (let productId = 1; productId <= products.length; productId++) {
    for (let imageNum = 1; imageNum <= imagesPerProduct; imageNum++) {
      for (
        let resolutionId = 0;
        resolutionId < resolutions.length;
        resolutionId++
      ) {
        // Create a blank image
        const width = resolutions[resolutionId].width; // Set your desired image width
        const height = resolutions[resolutionId].height; // Set your desired image height

        const image = await new Jimp(width, height, 0xffffffff);

        // Save the image
        const imageFilename = `product_${products[productId]._id}_${imageNum}_${width}w.jpg`;

        // Add text to the image
        const text = imageFilename;
        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        image.print(font, 10, 10, text);

        const imagePath = path.join(outputDirectory, imageFilename);
        await image.writeAsync(imagePath);
      }
    }
  }

  console.log('Images generated successfully.');
};

// Run the function
generateImages();
