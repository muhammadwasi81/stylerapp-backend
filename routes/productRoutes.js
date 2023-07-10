const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../utils/multipartData');
// const { authMiddleware } = require('../middleware/authMiddleware');

router.post(
  '/create_product',
  upload.single('image'),
  productController.createProductInfo
);

module.exports = router;
