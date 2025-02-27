"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductDTO {
    constructor() { }
    static register(data) {
        const { brand, model, description, price, quantity } = data;
        if (!brand || !model || !description || !price || !quantity)
            return {
                error: {
                    message: 'All fields are required: brand, model, description, price, image and quantity'
                }
            };
        const parsedPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (isNaN(parsedPrice)) {
            return {
                error: {
                    message: 'Invalid price, must be a number'
                }
            };
        }
        const parsedQuantity = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
        if (isNaN(parsedQuantity)) {
            return {
                error: {
                    message: 'Invalid quantity, must be a number'
                }
            };
        }
        return {
            error: null, value: {
                type: 'cellphone',
                brand,
                model,
                description,
                price: parsedPrice,
                image: 'https://picsum.photos/200/300',
                quantity: parsedQuantity,
            }
        };
    }
    static update(data) {
        const { brand, model, description, price, quantity } = data;
        if (!brand && !model && !description && !price && !quantity) {
            return {
                error: {
                    message: 'No fields to update'
                }
            };
        }
        const parsedPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (typeof parsedPrice !== 'number' || isNaN(parsedPrice)) {
            return {
                error: {
                    message: 'Invalid price, must be a number'
                }
            };
        }
        const parsedQuantity = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
        if (typeof parsedQuantity !== 'number' || isNaN(parsedQuantity)) {
            return {
                error: {
                    message: 'Invalid quantity, must be a number'
                }
            };
        }
        const updatedData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (brand !== undefined && { brand })), (model !== undefined && { model })), (description !== undefined && { description })), (parsedPrice !== undefined && { price: parsedPrice })), (parsedQuantity !== undefined && { quantity: parsedQuantity }));
        return {
            error: null, value: updatedData
        };
    }
}
exports.default = ProductDTO;
