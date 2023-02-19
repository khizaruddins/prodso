const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

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
        this.product_name = product.product_name;
        this.product_cost = product.product_cost;
        this.product_availability = product.product_availability;
    }

    save() {
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.error(err)
            });
        });
    }
    static fetchAll(cb) {
        getProductFromFile(cb);
    }
}