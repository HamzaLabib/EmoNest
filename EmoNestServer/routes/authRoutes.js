const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/welcome', (req, res) => {
  res.status(200).json({ message: `Welcome` });
});


module.exports = router;
