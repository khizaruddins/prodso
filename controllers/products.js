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
    const products = Product.fetchAll();
    res.render(path.join(pagesDir, 'product-list'), {pageTitle: 'My Shopping list', productList: products});
}
exports.postAddProduct = (req, res, next) => {
    const products = new Product(req.body);
    products.save();
    res.status(302).redirect('/admin/products');
}
exports.getHomePage = (req, res, next)=> {
    res.render(path.join(pagesDir, 'home'), {pageTitle: 'Home page' });
}
exports.getShopPage = (req, res, next)=> {
    res.render(path.join(pagesDir, 'shop'), {pageTitle: 'My Shop' });
}