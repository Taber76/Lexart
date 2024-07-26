"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const print_1 = __importDefault(require("../utils/print"));
class ProductDAO {
    constructor() { }
    static getAll(active) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield models_1.Product.findAll({
                    where: { active }
                });
                return products.map((product) => product.toJSON());
            }
            catch (error) {
                print_1.default.error('Error getting products [DAO].');
                throw new Error(`Get all -> ${error.errors.map((e) => e.message).join(', ')}`);
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield models_1.Product.findOne({ where: { id: id } });
                if (!product)
                    return null;
                return product.toJSON();
            }
            catch (error) {
                print_1.default.error('Error getting product [DAO].');
                throw new Error(`Get by id -> ${error.errors.map((e) => e.message).join(', ')}`);
            }
        });
    }
    static getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield models_1.Product.findAll({ where: { active: false } });
                return products.map((product) => product.toJSON());
            }
            catch (error) {
                print_1.default.error('Error getting deleted products [DAO].');
                throw new Error(`Get deleted -> ${error.errors.map((e) => e.message).join(', ')}`);
            }
        });
    }
    static register(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProduct = yield models_1.Product.create(product);
                return createdProduct.toJSON();
            }
            catch (error) {
                print_1.default.error('Error registering product [DAO].');
                throw new Error(`Registration -> ${error.errors.map((e) => e.message).join(', ')}`);
            }
        });
    }
    static registerMany(products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProducts = yield models_1.Product.bulkCreate(products);
                return createdProducts.map((product) => product.toJSON());
            }
            catch (error) {
                print_1.default.error('Error registering products [DAO].');
                throw new Error(`Registration -> ${error.errors.map((e) => e.message).join(', ')}`);
            }
        });
    }
    static update(product, allProducts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (allProducts) {
                    yield models_1.Product.update(product, { where: { active: true } });
                    return null;
                }
                else {
                    const productToUpdate = yield models_1.Product.findOne({ where: { id: product.id } });
                    if (!productToUpdate)
                        return null;
                    const updatedProduct = yield productToUpdate.update(product);
                    return updatedProduct.toJSON();
                }
            }
            catch (error) {
                print_1.default.error('Error updating product [DAO].');
                throw new Error(`Update -> ${error.errors.map((e) => e.message).join(', ')}`);
            }
        });
    }
}
exports.default = ProductDAO;
