const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
// const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
