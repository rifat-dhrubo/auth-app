/* eslint-disable no-underscore-dangle */
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { asyncHandler } = require('../utils/errorHandler');
const emailSender = require('../utils/mail');
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

  const [dataSaveError] = await asyncHandler(User.register(user, password));

  if (dataSaveError) {
    return res.json({ error: dataSaveError });
  }
  return next();
};

const updateUserInfo = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const [updateUserError, updatedUser] = await asyncHandler(
    User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true, context: 'query' }
    )
  );

  if (updateUserError) {
    return res.json({ error: updateUserError });
  }

  return res.json({ data: updatedUser });
};

const resetPassword = async (req, res) => {
  res.json({ message: 'reset Email' });
};

const verifyResetTokenAndLogin = async (req, res) => {
  const { token: resetToken } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.SECRET);
    const { _id } = decoded;

    const token = generateJwtToken(_id);

    const [userDataError, user] = await asyncHandler(User.findById(_id).exec());

    if (userDataError) {
      return res.json({ error: userDataError });
    }

    return res.json({
      isLoggedIn: true,
      token,
      data: user,
    });
  } catch (error) {
    console.log('here');
    return res.json(error);
  }
};

const sendMail = async (req, res) => {
  const { email } = req.body;
  const [noUserFoundErr, user] = await asyncHandler(User.findOne({ email }));

  if (noUserFoundErr) {
    return res.json({ error: noUserFoundErr });
  }

  const { _id } = user;
  const resetPasswordToken = jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: 3600000,
  });

  const resetURL = `http://${req.headers.host}/api/v1/forgot/${resetPasswordToken}`;

  const [sendMailError] = await asyncHandler(
    emailSender.send({
      template: 'password-reset',
      message: {
        from: 'Rifat Hossain <rifat@gmail.com>',
        to: user.email,
      },
      locals: {
        name: user.name,
        resetURL,
      },
    })
  );

  if (sendMailError) {
    console.log(`here`);
    return res.json({ error: sendMailError });
  }

  return res.json({
    data: user,
    resetURL,
  });
};

module.exports = {
  register,
  validateRegister,
  updateUserInfo,
  resetPassword,
  sendMail,
  verifyResetTokenAndLogin,
};
