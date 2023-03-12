const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getHomePage);

router.get('/shop',productsController.getShopPage);

router.get('/cart', productsController.getCart);

router.post('/cart', productsController.postCart);

router.get('/order', productsController.getOrderPage);

router.post('/cart-delete-item', productsController.postDeleteCartItem);

module.exports = router;