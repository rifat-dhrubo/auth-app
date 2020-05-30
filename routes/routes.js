const express = require('express');
const {
  validateRegister,
  register,
  updateUserInfo,

  sendMail,
  verifyResetTokenAndLogin,
} = require('../controllers/userController');
const {
  localVerify,
  generateAndSendJwtToken,
  jwtVerify,
} = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: true });
});

router.post(
  '/api/v1/register',
  validateRegister,
  register,
  localVerify,
  generateAndSendJwtToken
);
router.post('/api/v1/login', localVerify, generateAndSendJwtToken);
router.put('/api/v1/update', jwtVerify, updateUserInfo);

// check if that users exists
// set resetToken and time and save that to db
// send the mail with token
// if token is valid update the user ans set token to undefined

router.post('/api/v1/forgot', sendMail);
router.post('/api/v1/forgot/verify', verifyResetTokenAndLogin);

module.exports = router;
