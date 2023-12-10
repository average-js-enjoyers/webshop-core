const { OpenAI } = require('openai');
const mongoose = require('mongoose');
const Product = require('../../../models/product.model');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp'); // Import sharp module
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log('DB connection successful!'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

create();

const angles = [
  'Generate an image from side view of ',
  'Generate an image from diagonal view of ',
  'Generate an image from top view of ',
];
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

async function create() {
  const products = await Product.find();

  const startIdx = products.findIndex(
    (product) => product.name === 'BattleRig Titan',
  );

  for (let i = startIdx; i < startIdx + 1; i++) {
    const p = products[i];
    for (let no = 0; no < angles.length; no++) {
      const prompt = `${angles[no]} ${p.name}, ${p.description}`;

      console.log(prompt);

      const imageResponse = await openai.images.generate({
        prompt: prompt,
        response_format: 'b64_json',
      });

      const b64ImageData = imageResponse.data[0].b64_json;

      // Specify the path and filename for saving the image
      const dir = process.env.SEED_FOLDER;

      // Save and resize the image to the local disk
      for (
        let resolutionId = 0;
        resolutionId < resolutions.length;
        resolutionId++
      ) {
        const savePath = path.join(
          dir,
          `product_${p._id}_${no}_${resolutions[resolutionId].width}w.jpg`,
        );
        await saveResizedImageToFile(b64ImageData, savePath, {
          width: resolutions[resolutionId].width,
          height: resolutions[resolutionId].height,
        });
        console.log('Image saved to:', savePath);
      }
    }
    await sleep(30000); // 60,000 milliseconds = 1 minute
  }
}

// Function to sleep for a specified duration
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function saveResizedImageToFile(
  base64ImageData,
  filePath,
  resizeOptions,
) {
  // Decode the base64 data to binary
  const binaryImageData = Buffer.from(base64ImageData, 'base64');

  // Resize the image using sharp
  const resizedBuffer = await sharp(binaryImageData)
    .resize(resizeOptions.width, resizeOptions.height)
    .toBuffer();

  // Save the resized image to a file using fs.promises.writeFile
  await fs.promises.writeFile(filePath, resizedBuffer);
}
