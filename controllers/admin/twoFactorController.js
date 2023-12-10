const catchAsync = require('../../services/catchAsync');
const AppError = require('../../services/appError');
const speakeasy = require('speakeasy');
const Admin = require('../../models/admin.model');

exports.set2fa = catchAsync(async (req, res, next) => {
  const user = await Admin.findById(req.user.id);

  if (user.twofa.enabled) {
    return next(
      new AppError('You have already setup 2fa. Please remove it first.', 400),
    );
  }

  const secret = speakeasy.generateSecret({ length: 20 });

  await Admin.findByIdAndUpdate(req.user.id, {
    twofa: {
      secret: secret.base32,
      verified: false,
      enabled: false,
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      secret: secret.otpauth_url,
    },
  });
});

exports.verify2fa = catchAsync(async (req, res, next) => {
  const { token } = req.body;

  const user = await Admin.findById(req.user.id).select('+2fa.secret');

  // Retrieve the user's secret key
  const secret = user.twofa.secret;

  // Verify the token
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
  });

  if (!verified) {
    return next(new AppError('Incorrect token!', 400));
  }

  await Admin.findByIdAndUpdate(req.user.id, {
    twofa: {
      secret: secret,
      verified: verified,
      enabled: true,
    },
  });

  const updatedUser = await Admin.findById(req.user.id);
  updatedUser.twofa.secret = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      message: updatedUser,
    },
  });
});

exports.remove2fa = catchAsync(async (req, res, next) => {
  await Admin.findByIdAndUpdate(req.user.id, {
    twofa: {
      secret: undefined,
      verified: false,
      enabled: false,
    },
  });

  const user = await Admin.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});

exports.protect2fa = catchAsync(async (req, res, next) => {
  const user = await Admin.findById(req.user.id);

  if (user.twofa.enabled && !user.twofa.verified) {
    return next(
      new AppError(
        'Please process to 2fa verification. Send the TOTP token to POST api/admin/profile/verify-2fa',
        401,
      ),
    );
  }

  next();
});
