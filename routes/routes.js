const express = require('express');
const {
  validateRegister,
  register,
  updateUserInfo,
  getUserData,
  sendPasswordResetMail,
  verifyResetTokenAndLogin,
  validatePasswordReset,
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
router.post('/api/v1/login', localVerify, generateAndSendJwtToken);
router.put('/api/v1/update', jwtVerify, updateUserInfo);
router.post('/api/v1/verify', (req, res) => {
  jwtVerifyWithResponse(req, res);
});

router.post('/api/v1/forgot', sendPasswordResetMail);
router.post(
  '/api/v1/forgot/verify',
  validatePasswordReset,
  verifyResetTokenAndLogin
);
router.get('/api/v1/user', getUserData);
router.get('/api/v1/verify/:token', getUserData);
router.get('/api/v1/verify/email/:token', verifyEmail);

module.exports = router;
