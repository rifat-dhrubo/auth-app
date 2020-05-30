const express = require('express');

const router = express.Router();
const {
  validateRegister,
  register,
  updateUser,
} = require('../controllers/userController');
const {
  localVerify,
  generateAndSendJwtToken,
  jwtVerify,
} = require('../controllers/authController');

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
router.put('/api/v1/update', jwtVerify, updateUser);

module.exports = router;
