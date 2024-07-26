"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
class ProductHelper {
    constructor() { }
    static createProduct() {
        return {
            type: 'cellphone',
            brand: faker_1.faker.commerce.productMaterial(),
            model: faker_1.faker.commerce.productMaterial(),
            description: faker_1.faker.commerce.productDescription(),
            price: faker_1.faker.number.int({ min: 1000, max: 10000 }),
            image: 'imageUrl',
            quantity: faker_1.faker.number.int({ min: 10, max: 100 }),
        };
    }
    static createMany(qty) {
        const products = [];
        for (let i = 0; i < qty; i++) {
            products.push(this.createProduct());
        }
        return products;
    }
}
exports.default = ProductHelper;
