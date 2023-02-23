// node module imports
const path  = require('path');
// constants 
const pagesDir = path.join(__dirname, '..', 'views', 'pages');

const Product = require('../models/product');

// controller functions and binding view with data
exports.getAddProduct = (req, res, next)=> {
    res.render(
        path.join(pagesDir, 'add-product'), { pageTitle: 'Add Product page'});
}
exports.getShoppingList = (req, res, next) => {
    Product.fetchAll((products => {
        res.render(path.join(pagesDir, 'product-list'), {pageTitle: 'My Shopping list', productList: products});
    }));
}
exports.postAddProduct = (req, res, next) => {
    const products = new Product({id: Math.random().toString(), ...req.body});
    products.save();
    res.redirect('/admin/products');
}
exports.getHomePage = (req, res, next)=> {
    res.render(path.join(pagesDir, 'home'), {pageTitle: 'Home page' });
}
exports.getShopPage = (req, res, next)=> {
    res.render(path.join(pagesDir, 'shop'), {pageTitle: 'My Shop' });
}
exports.getCart = (req, res, next) => {
    res.render(path.join(pagesDir, 'cart'), {pageTitle: 'Your Cart'});
}
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    res.redirect('/order');
}
exports.getOrderPage = (req, res, next) => {
    res.render(path.join(pagesDir, 'order'), {pageTitle: 'My Orders'});
}

exports.getProductDetailsPage = (req ,res, next) => {
    const productId = +req.params.productId;
    Product.findById(productId, product => {
        res.render(path.join(pagesDir, 'product-details'), {pageTitle: 'Product Details', product});
    });
}