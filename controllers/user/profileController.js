const { validationResult } = require('express-validator');
const User = require('../../models/user.model');
const Address = require('../../models/address.model');
const catchAsync = require('../../services/catchAsync');
const AppError = require('../../services/appError');
const cdn = require('../../services/cdn');
const jwtHandler = require('../../services/jwtHandler');

exports.onboard = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, phoneNumber } = req.body;

  const user = await User.findById(req.user.id);
  user.firstName = firstName;
  user.lastName = lastName;
  user.phoneNumber = phoneNumber;

  const { password, passwordConfirm } = req.body;

  if (!user.externalAuth) {
    if (!password || !passwordConfirm) {
      return next(
        new AppError('Please provide password, passwordConfirm!', 400),
      );
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.hasPassword = true;
  }

  user.emailConfirmed = true;
  user.save();

  res.status(200).json({
    status: 'success',
    data: {
      message: 'You are now onboarded!',
    },
  });
});

exports.checkOnboard = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user.emailConfirmed) {
    return next(
      new AppError(
        "You haven't finished on boarding process. Please send a POST request to api/user/profile/onboard",
        401,
      ),
    );
  }

  next();
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const defaultPhoto =
    'https://firebasestorage.googleapis.com/v0/b/average-js-webshop.appspot.com/o/profile-photos%2Fdefault.png?alt=media';

  await User.findByIdAndUpdate(req.user.id, {
    profilePhoto: defaultPhoto,
  });

  res.status(200).json({
    status: 'success',
    data: {
      profilePhoto: defaultPhoto,
    },
  });
});

exports.uploadPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uploadedImage = req.file;
  const imgUrl = await cdn.create(
    uploadedImage,
    `profile-photos/${req.user.id}.jpg`,
  );
  await User.findByIdAndUpdate(req.user.id, { profilePhoto: imgUrl });

  res.status(200).json({
    message: 'Image uploaded and overwritten successfully',
    imageUrl: imgUrl,
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el) && el) newObj[el] = obj[el];
  });
  return newObj;
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'phoneNumber',
    'emailAddress',
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  user.addresses = undefined;

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});

exports.getAllAddress = catchAsync(async (req, res, next) => {
  const { addresses } = await User.findOne({ _id: req.user.id }).populate(
    'addresses',
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: addresses,
    },
  });
});

exports.createAddress = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id }).exec();

  const newAddress = await Address.create({
    city: req.body.city,
    region: req.body.region,
    vatID: req.body.vatID,
    type: req.body.type,
    isActive: req.body.isActive,
    company: req.body.company,
    addressLine: req.body.addressLine,
    name: req.body.name,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
  });

  user.addresses.push(newAddress._id);
  user.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: newAddress,
    },
  });
});

exports.deleteAddress = catchAsync(async (req, res, next) => {
  const address = await Address.findById(req.query.id);
  const user = await User.findById(req.user.id);

  if (address === null || !user.addresses.includes(address._id)) {
    return next(new AppError('No address found with that ID', 404));
  }

  await Address.findByIdAndDelete(address._id);

  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const address = await Address.findById(req.body.id);
  const user = await User.findById(req.user.id);

  if (address === null || !user.addresses.includes(address._id)) {
    return next(new AppError('No address found with that ID', 404));
  }

  // 3) Update user document
  const updateAddress = await Address.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateAddress,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (
    !user.externalAuth &&
    !(await user.correctPassword(req.body.passwordCurrent, user.password))
  ) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.hasPassword = true;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  jwtHandler.createSendToken(user, 200, res);
});
