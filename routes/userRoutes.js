const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/signup', authMiddleware, registerUser);
router.post('/login', authMiddleware, loginUser);

module.exports = router;
