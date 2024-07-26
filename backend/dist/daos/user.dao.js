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
class UserDAO {
    constructor() { }
    static register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUser = yield models_1.User.create(user);
                return createdUser.toJSON();
            }
            catch (error) {
                print_1.default.error('Error registering user [DAO].');
                throw new Error(`Registration -> ${error.errors.map((e) => e.message).join(', ')}`);
            }
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield models_1.User.findOne({ where: { email: email } });
                if (!foundUser)
                    return null;
                return foundUser.toJSON();
            }
            catch (error) {
                print_1.default.error('Error logging user [DAO]: ' + error.errors);
                throw new Error(`Login -> ${error.errors.map((e) => e.message).join(', ')}`);
            }
        });
    }
}
exports.default = UserDAO;
