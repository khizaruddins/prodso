// node module imports
const path  = require('path');
// constants 
const pagesDir = path.join(__dirname, '..', 'views', 'pages');

const Product = require('../models/product');
const Cart = require('../models/cart');

// controller functions and binding view with data
exports.getAddProduct = (req, res, next)=> {
    res.render(
        path.join(pagesDir, 'edit-product'), { pageTitle: 'Add Product page'});
}

exports.getEditProduct = (req, res, next)=> {
    const prodId = +req.params.productId;

    Product.findById(prodId, product => {
        res.render(
            path.join(pagesDir, 'edit-product'), { pageTitle: 'Edit Product page', product});
    })
}
exports.postEditProduct = (req, res, next) => {
    const prodId = +req.body.productId;
    const updatedTitle = req.body.product_name;
    const updatedCost = req.body.product_cost;
    const updatedAvailability = req.body.product_availability;
    const updatedProduct = new Product({
        id: prodId, 
        product_name: updatedTitle,
        product_cost: updatedCost,
        product_availability: updatedAvailability
    });
    updatedProduct.save();
    res.redirect('/admin/products');
}
exports.postDeleteProduct = (req, res, next) => {
    const prodId = +req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}
exports.getShoppingList = (req, res, next) => {
    Product.fetchAll((products => {
        res.render(path.join(pagesDir, 'product-list'), {pageTitle: 'My Shopping list', productList: products});
    }));
}
exports.postAddProduct = (req, res, next) => {
    const products = new Product({id: null, ...req.body});
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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (const product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData){
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            console.log(cartProducts);
            res.render(path.join(pagesDir, 'cart'), {pageTitle: 'Your Cart', products: cartProducts});
        })
    });
}
exports.postDeleteCartItem = (req, res, next) => {
    const prodId = +req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteById(prodId, +product.product_cost);
        res.redirect('/cart');
    });
}
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(+prodId, +product.product_cost);
    })
    res.redirect('/cart');
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