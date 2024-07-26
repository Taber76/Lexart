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
const user_dao_1 = __importDefault(require("../daos/user.dao"));
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
const print_1 = __importDefault(require("../utils/print"));
class AuthService {
    constructor() { }
    // ERROR HANDLING -------------------------------------------------------------
    static handleError(error, success, console) {
        print_1.default.error(console);
        return { success, message: '' + error };
    }
    // REGISTER USER -------------------------------------------------------------
    static register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUser = yield user_dao_1.default.register(user);
                if (!createdUser)
                    return { success: false, message: 'User already exists.' };
                const token = auth_helper_1.default.generateToken(createdUser);
                return {
                    success: true,
                    message: 'User created successfully.',
                    user: { username: createdUser.username },
                    token
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service creating user [AuthService]');
            }
        });
    }
    // LOGIN USER ----------------------------------------------------------------
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_dao_1.default.getByEmail(email);
                if (!user || !(yield auth_helper_1.default.comparePasswords(password, user.password)))
                    return {
                        success: false,
                        message: 'Invalid email or password.'
                    };
                const token = auth_helper_1.default.generateToken(user);
                return {
                    success: true,
                    message: 'User logged in successfully.',
                    user: { username: user.username },
                    token
                };
            }
            catch (error) {
                return this.handleError(error, false, 'Service logging user [AuthService]');
            }
        });
    }
    // CHECK USER TOKEN ----------------------------------------------------------
    static checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = auth_helper_1.default.decodeToken(token);
                return decodedToken;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.default = AuthService;
