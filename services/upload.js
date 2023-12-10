const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create a function to check if the uploaded file is an image
const imageFilter = function (req, file, cb) {
  const allowedFileTypes = /jpeg|jpg|png|gif/; // Add more extensions as needed
  const extname = path.extname(file.originalname).toLowerCase();
  const { mimetype } = file;

  if (allowedFileTypes.test(extname) && allowedFileTypes.test(mimetype)) {
    return cb(null, true);
  }
  cb(
    new Error(
      'Only image files with .jpeg, .jpg, .png, or .gif extensions are allowed.',
    ),
  );
};

// Create a multer instance with file size limit
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB file size limit (adjust as needed)
  },
  fileFilter: imageFilter, // Use the image filter function
});

module.exports = upload;
