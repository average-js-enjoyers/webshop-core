const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const passwordRules = require('../config/mongodb/passwordRules');

const { Schema } = mongoose;

const UserSchema = new Schema({
  emailAddress: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phoneNumber: String,
  password: {
    type: String,
    required: [false, 'Please provide a password'],
    select: false,
    validate: [
      (password) => validator.isStrongPassword(password, passwordRules),
      'Please provide a valid password',
    ],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailConfirmed: {
    type: Boolean,
    default: false,
    select: true,
  },
  emailConfirmedAt: Date,
  firstName: {
    type: String,
    required: [false, 'Please tell us your first name!'],
  },
  lastName: {
    type: String,
    required: [false, 'Please tell us your last name!'],
  },
  profilePhoto: String,
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLoginDate: Date,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  twoFactorEnabled: Boolean,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  externalAuth: {
    type: Boolean,
    default: false,
    select: true,
  },
  hasPassword: {
    type: Boolean,
    default: false,
    select: true,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
  ],
});

UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('emailConfirmed') || this.isNew) return next();

  this.emailConfirmedAt = Date.now() - 1000;
  next();
});

UserSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
