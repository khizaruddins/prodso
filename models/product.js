const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
const Cart = require('./cart')

const getProductFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(product) {
        this.id = product.id;
        this.product_name = product.product_name;
        this.product_cost = product.product_cost;
        this.product_availability = product.product_availability;
    }

    save() {
        getProductFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.error(err)
                });
            } else {
                this.id = Math.round(Math.random() * 100);
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.error(err)
                });
            }
        });
    }

    static deleteById(id) {
        getProductFromFile(products => {
            const updatedProducts = products.filter(item => item.id !== +id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    // delete product from cart
                    const product = products.filter(item => item.id === id);
                    Cart.deleteById(id, product.price); 
                }
            })
        });
    }
    static fetchAll(cb) {
        getProductFromFile(cb);
    }

    static findById(id, cb) {
        getProductFromFile(products => {
            const product = products.find(item => item.id === +id);
            cb(product);
        });
    }
}