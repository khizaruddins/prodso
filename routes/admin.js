const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.get('/add-product',productsController.getAddProduct);

router.get('/products', productsController.getShoppingList);

router.post('/products', productsController.postAddProduct);

module.exports = router;