const { body, validationResult } = require('express-validator');
const User = require('../Models/User');
const { asyncHandler } = require('../utils/errorHandler');

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

// const login = (req, res) => {};

module.exports = { register, validateRegister };
