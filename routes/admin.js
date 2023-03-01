const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.get('/add-product',productsController.getAddProduct);

router.get('/edit-product/:productId',productsController.getEditProduct);

router.get('/products', productsController.getShoppingList);

router.get('/products/:productId', productsController.getProductDetailsPage);

router.post('/products', productsController.postAddProduct);

module.exports = router;