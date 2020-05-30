const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: true });
});
router.get('/api/v1/', (req, res) => {
  res.json({ working: true });
});

module.exports = router;
