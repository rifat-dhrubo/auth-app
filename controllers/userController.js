/* eslint-disable no-underscore-dangle */
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { asyncHandler } = require('../utils/errorHandler');
const { mailSender } = require('../utils/mail');
const { generateJwtToken } = require('./authController');

const validateRegister = [
  body('name', 'You must provide a name')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('You must provide a name that is 3 characters or more'),
  body('email', 'You must provide a valid email').isEmail().normalizeEmail({
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
  }),
  body('phone', 'You must provide a valid phone number')
    .notEmpty()
    .isLength({ min: 7, max: 11 }),
  body('password', 'Password can not be empty').notEmpty(),
  body('passwordConfirm', 'Confirm password can not be empty').notEmpty(),
  body('passwordConfirm', 'Your passwords do not match').custom(
    (value, { req }) => value === req.body.password
  ),
];

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, password, phone } = req.body;
  const user = new User({ name, email, phone });

  const verifyToken = jwt.sign({ email }, process.env.SECRET, {
    expiresIn: 3600000,
  });

  const verifyURL = `http://127.0.0.1:8000/verify/${verifyToken}`;

  const [sendMailError, sendMail] = await asyncHandler(
    mailSender({
      email: `rifat@gmail.com`,
      subject: 'Verify User',
      fileName: 'verify',
      URL: verifyURL,
      name,
    })
  );

  if (sendMailError) {
    console.log('mail');
    return res.json({ error: sendMailError, sendMail });
  }
  const [dataSaveError] = await asyncHandler(User.register(user, password));

  if (dataSaveError) {
    console.log('save');
    return res.json({ error: dataSaveError });
  }
  return next();
};

const updateUserInfo = async (req, res) => {
  const updates = {
    name: req.body.name || req.user.name,
    email: req.body.email || req.user.email,
    phone: req.body.phone || req.user.phone,
  };

  const [updateUserError, updatedUser] = await asyncHandler(
    User.findByIdAndUpdate(req.user._id, { $set: updates }, { new: true })
  );

  if (updateUserError) {
    return res.json({ error: updateUserError });
  }

  return res.json({ data: updatedUser });
};

const sendMail = async (req, res) => {
  const { email } = req.body;
  const [noUserFoundErr, user] = await asyncHandler(User.findOne({ email }));
  if (noUserFoundErr) {
    return res.json({ error: noUserFoundErr });
  }
  if (user == null) {
    res.json({ found: false, error: 'No user found' });
  }
  const { _id } = user;
  const resetPasswordToken = jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: 3600000,
  });
  const resetURL = `http://127.0.0.1:3000/resetVerify/${resetPasswordToken}`;
  const [sendMailError] = await asyncHandler(
    mailSender({
      email: `rifat@gmail.com`,
      subject: 'Reset Password',
      fileName: 'reset',
      URL: resetURL,
      name: user.name,
    })
  );
  if (sendMailError) {
    return res.json({ error: sendMailError });
  }
  return res.json({
    data: user,
    resetURL,
  });
};

const validatePasswordReset = [
  body('password', 'Password can not be empty').notEmpty(),
  body('passwordConfirm', 'Confirm password can not be empty').notEmpty(),
  body('passwordConfirm', 'Your passwords do not match').custom(
    (value, { req }) => value === req.body.password
  ),
];

const verifyResetTokenAndLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { token: resetToken, password } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.SECRET);
    const { _id } = decoded;

    const token = generateJwtToken(_id);

    const [userDataError, user] = await asyncHandler(User.findById(_id).exec());

    const [setPasswordError, newPasswordUser] = await asyncHandler(
      user.setPassword(password)
    );
    const [newPasswordUserSaveError] = await asyncHandler(
      newPasswordUser.save(password)
    );

    if (userDataError || setPasswordError || newPasswordUserSaveError) {
      return res.json({
        error: userDataError || userDataError || newPasswordUserSaveError,
      });
    }

    return res.json({
      isLoggedIn: true,
      token,
      data: user,
    });
  } catch (error) {
    return res.json({ error });
  }
};

const getUserData = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 4;
  const skip = page * limit - limit;

  // 1. Query the database for a list of all stores
  const storesPromise = User.find()
    .skip(skip)
    .limit(limit)
    .sort({ name: 'desc' });

  const countPromise = User.countDocuments();

  const [user, count] = await Promise.all([storesPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  res.json({ user, count, pages });
};
const verifyEmail = (req, res) => {
  const { token } = req.params;

  try {
    jwt.verify(token, process.env.SECRET);
    res.json({
      data: {
        success: true,
        message: 'user verified',
      },
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  register,
  validateRegister,
  updateUserInfo,
  sendMail,
  verifyResetTokenAndLogin,
  getUserData,
  verifyEmail,
  validatePasswordReset,
};
