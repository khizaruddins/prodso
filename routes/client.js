const express = require('express');
const path = require('path');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getHomePage);

router.get('/shop',productsController.getShopPage);

module.exports = router;