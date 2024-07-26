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
const product_dao_1 = __importDefault(require("../daos/product.dao"));
const app_1 = require("../app");
const product_helper_1 = __importDefault(require("../helpers/product.helper"));
const print_1 = __importDefault(require("../utils/print"));
class ProductService {
    constructor() { }
    // ERROR HANDLING -------------------------------------------------------------
    static handleError(error, success, console) {
        print_1.default.error(console);
        return { success, message: '' + error };
    }
    // GET ALL PRODUCTS ----------------------------------------------------------
    static getAll(active) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_dao_1.default.getAll(active);
                return {
                    success: true,
                    message: 'Products retrieved successfully.',
                    products
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service getting all products [ProductService]');
            }
        });
    }
    // GET PRODUCT BY ID ---------------------------------------------------------
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_dao_1.default.getById(id);
                return {
                    success: true,
                    message: 'Product retrieved successfully.',
                    product: product
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service getting product by id [ProductService]');
            }
        });
    }
    // CREATE PRODUCT ------------------------------------------------------------
    static create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdProduct = yield product_dao_1.default.register(product);
                return {
                    success: true,
                    message: 'Product created successfully.',
                    product: createdProduct
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service creating product [ProductService]');
            }
        });
    }
    // CREATE 50 PRODUCTS --------------------------------------------------------
    static createMany(wsClient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        const product = product_helper_1.default.createMany(1);
                        yield product_dao_1.default.register(product[0]);
                        (_a = app_1.server.socketServer) === null || _a === void 0 ? void 0 : _a.sendMessageToClient(wsClient, {
                            type: 'progress',
                            progress: ((i + 1) / 50) * 100,
                        });
                        if (i === 49) {
                            (_b = app_1.server.socketServer) === null || _b === void 0 ? void 0 : _b.sendMessageToClient(wsClient, {
                                type: 'createdAllProducts',
                                success: true,
                            });
                        }
                    }), i * 200);
                }
                //const createdProducts = await ProductDAO.registerMany(products);
                return {
                    success: true,
                    message: 'Products created successfully.',
                    //products: createdProducts
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service creating products [ProductService]');
            }
        });
    }
    // UPDATE PRODUCT ------------------------------------------------------------
    static update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productToUpdate = yield product_dao_1.default.getById(id);
                if (!productToUpdate)
                    return {
                        success: false,
                        message: 'Product not found.'
                    };
                const updatedProduct = yield product_dao_1.default.update(Object.assign({ id }, product), false);
                return {
                    success: true,
                    message: 'Product updated successfully.',
                    product: updatedProduct
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service updating product [ProductService]');
            }
        });
    }
    // DELETE PRODUCT ------------------------------------------------------------
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productToDelete = yield product_dao_1.default.getById(id);
                if (!productToDelete)
                    return {
                        success: false,
                        message: 'Product not found.'
                    };
                const deletedProduct = yield product_dao_1.default.update({ id, active: false }, false);
                return {
                    success: true,
                    message: 'Product deleted successfully.',
                    product: deletedProduct
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service deleting product [ProductService]');
            }
        });
    }
    // DELETE ALL PRODUCTS -------------------------------------------------------
    static deleteAll(wsClient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_dao_1.default.getAll(true);
                for (let i = 0; i < products.length; i++) {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        yield product_dao_1.default.update({ id: products[i].id, active: false }, false);
                        (_a = app_1.server.socketServer) === null || _a === void 0 ? void 0 : _a.sendMessageToClient(wsClient, {
                            type: 'progress',
                            progress: ((i + 1) / products.length) * 100,
                        });
                        if (i === products.length - 1) {
                            (_b = app_1.server.socketServer) === null || _b === void 0 ? void 0 : _b.sendMessageToClient(wsClient, {
                                type: 'deletedAllProducts',
                                success: true,
                            });
                        }
                    }), i * 200);
                }
                return {
                    success: true,
                    message: 'Products deleted successfully.',
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service deleting all products [ProductService]');
            }
        });
    }
}
exports.default = ProductService;
