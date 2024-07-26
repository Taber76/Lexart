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
const product_service_1 = __importDefault(require("../services/product.service"));
const httpStatusCodes_1 = __importDefault(require("../constants/httpStatusCodes"));
const product_dto_1 = __importDefault(require("../dtos/product.dto"));
class ProductController {
    constructor() { }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceResponse = yield product_service_1.default.getAll(true);
                if (!serviceResponse.success) {
                    res.status(httpStatusCodes_1.default.BAD_REQUEST).json(serviceResponse);
                    return;
                }
                res.status(httpStatusCodes_1.default.OK).json(serviceResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    res.status(httpStatusCodes_1.default.BAD_REQUEST).json({ success: false, message: 'Product id is required' });
                    return;
                }
                const serviceResponse = yield product_service_1.default.getById(req.params.id);
                if (!serviceResponse.success) {
                    res.status(httpStatusCodes_1.default.BAD_REQUEST).json(serviceResponse);
                    return;
                }
                res.status(httpStatusCodes_1.default.OK).json(serviceResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getDeleted(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceResponse = yield product_service_1.default.getAll(false);
                if (!serviceResponse.success) {
                    res.status(httpStatusCodes_1.default.BAD_REQUEST).json(serviceResponse);
                    return;
                }
                res.status(httpStatusCodes_1.default.OK).json(serviceResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = product_dto_1.default.register(req.body);
            if (error) {
                res.status(httpStatusCodes_1.default.BAD_REQUEST).json(error);
                return;
            }
            try {
                const serviceResponse = yield product_service_1.default.create(value);
                if (!serviceResponse.success) {
                    res.status(httpStatusCodes_1.default.BAD_REQUEST).json(serviceResponse);
                    return;
                }
                res.status(httpStatusCodes_1.default.CREATED).json(serviceResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createMany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /*
                const serviceResponse = await ProductService.createMany('');
                if (!serviceResponse.success) {
                  res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
                  return;
                }
                  */
                res.status(httpStatusCodes_1.default.NOT_IMPLEMENTED).json({ success: false, message: 'Not implemented' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.id) {
                res.status(httpStatusCodes_1.default.BAD_REQUEST).json({ success: false, message: 'Product id is required' });
                return;
            }
            const { error, value } = product_dto_1.default.update(req.body);
            if (error) {
                res.status(httpStatusCodes_1.default.BAD_REQUEST).json(error);
                return;
            }
            try {
                const serviceResponse = yield product_service_1.default.update(req.params.id, value);
                if (!serviceResponse.success) {
                    res.status(httpStatusCodes_1.default.BAD_REQUEST).json(serviceResponse);
                    return;
                }
                res.status(httpStatusCodes_1.default.OK).json(serviceResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    res.status(httpStatusCodes_1.default.BAD_REQUEST).json({ success: false, message: 'Product id is required' });
                    return;
                }
                const serviceResponse = yield product_service_1.default.delete(req.params.id);
                if (!serviceResponse.success) {
                    res.status(httpStatusCodes_1.default.BAD_REQUEST).json(serviceResponse);
                    return;
                }
                res.status(httpStatusCodes_1.default.OK).json(serviceResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /*
                const serviceResponse = await ProductService.deleteAll('');
                if (!serviceResponse.success) {
                  res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
                  return;
                }
                */
                res.status(httpStatusCodes_1.default.NOT_IMPLEMENTED).json({ success: false, message: 'Not implemented' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductController;
