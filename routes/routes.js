const express = require('express');
const {
  validateRegister,
  register,
  updateUserInfo,
  getUserData,
  sendMail,
  verifyResetTokenAndLogin,
  verifyEmail,
} = require('../controllers/userController');
const {
  localVerify,
  generateAndSendJwtToken,
  jwtVerify,
  jwtVerifyWithResponse,
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
router.post('/api/v1/login', jwtVerify, generateAndSendJwtToken);
router.put('/api/v1/update', jwtVerify, updateUserInfo);
router.post('/api/v1/email/verify', verifyEmail);
router.post('/api/v1/verify', (req, res) => {
  jwtVerifyWithResponse(req, res);
});

router.post('/api/v1/forgot', sendMail);
router.post('/api/v1/forgot/verify', verifyResetTokenAndLogin);
router.get('/api/v1/user', getUserData);

module.exports = router;
