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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const httpStatusCodes_1 = __importDefault(require("../constants/httpStatusCodes"));
const user_dto_1 = __importDefault(require("../dtos/user.dto"));
class AuthController {
    constructor() { }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = user_dto_1.default.register(req.body);
            if (error) {
                res.status(httpStatusCodes_1.default.BAD_REQUEST).json(error);
                return;
            }
            try {
                const serviceResponse = yield auth_service_1.default.register(value);
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
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = user_dto_1.default.login(req.body);
            if (error) {
                res.status(httpStatusCodes_1.default.BAD_REQUEST).json(error);
                return;
            }
            try {
                const serviceResponse = yield auth_service_1.default.login(value.email, value.password);
                if (serviceResponse.success === false) {
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
    static checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceResponse = yield auth_service_1.default.checkToken(req.headers.authorization);
                if (!serviceResponse) {
                    res.status(httpStatusCodes_1.default.UNAUTHORIZED).json({ success: false, message: 'Invalid token' });
                    return;
                }
                res.status(httpStatusCodes_1.default.OK).json({ success: true, message: 'Token valid', token: serviceResponse });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthController;
