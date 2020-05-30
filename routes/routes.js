const express = require('express');

const router = express.Router();
const { validateRegister, register } = require('../controllers/userController');
const {
  localVerify,
  generateJwtToken,
} = require('../controllers/authController');

router.get('/', (req, res) => {
  res.json({ message: true });
});

router.post(
  '/api/v1/register',
  validateRegister,
  register,
  localVerify,
  generateJwtToken
);
router.post('/api/v1/login', localVerify, generateJwtToken);

module.exports = router;
