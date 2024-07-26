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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../config/environment");
class AuthHelper {
    constructor() { }
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(environment_1.SALT_ROUNDS);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            return hashedPassword;
        });
    }
    static comparePasswords(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, hashedPassword);
        });
    }
    static generateToken(user) {
        return jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, user), { password: null }), environment_1.JWT_SECRET, { expiresIn: environment_1.JWT_EXPIRES_IN });
    }
    static verifyToken(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, environment_1.JWT_SECRET);
            if (typeof decodedToken === 'object' && decodedToken !== null) {
                const { iat, exp } = decodedToken, rest = __rest(decodedToken, ["iat", "exp"]);
                return rest;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return false;
        }
    }
    static decodeToken(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, environment_1.JWT_SECRET);
            return decodedToken;
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
}
exports.default = AuthHelper;
