const admin = require('firebase-admin');
const { getStorage, ref, getDownloadURL } = require('firebase-admin/storage');
const sharp = require('sharp');
const fs = require('fs');
const serviceAccount = require('../config/firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://average-js-webshop.appspot.com',
});

exports.create = async (uploadedImage, filePath) => {
  const imageBuffer = uploadedImage.path; // The image data

  const processedImageBuffer = await sharp(imageBuffer)
    .resize({ width: 400 })
    .toBuffer();

  const bucket = admin.storage().bucket();

  const file = bucket.file(filePath);

  // Stream the file to Firebase Storage
  const fileStream = file.createWriteStream({
    metadata: {
      contentType: 'image/jpeg', // Adjust the content type based on your file type
    },
    validation: 'md5',
  });

  fileStream.on('error', (error) => {
    fs.unlink(uploadedImage.path, (err) => {
      if (err) {
        console.error('Error deleting the uploaded file:', err);
      }
    });
  });

  fileStream.on('finish', () => {
    fs.unlink(uploadedImage.path, (err) => {
      if (err) {
        console.error('Error deleting the uploaded file:', err);
      }
    });
  });

  fileStream.write(processedImageBuffer);
  fileStream.end();

  // Get the downloadUrl for a given file ref
  const fileRef = getStorage().bucket(admin.storageBucket).file(filePath);
  const downloadUrl = await getDownloadURL(fileRef);

  return downloadUrl;
};
