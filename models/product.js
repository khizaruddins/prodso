const products = []

module.exports = class Product {
    constructor(product) {
        this.product_name = product.product_name;
        this.product_cost = product.product_cost;
        this.product_availability = product.product_availability;
    }

    save() {
        products.push(this);
    }
    static fetchAll() {
        return products;
    }
}