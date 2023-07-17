const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
} = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUserById);

module.exports = router;
