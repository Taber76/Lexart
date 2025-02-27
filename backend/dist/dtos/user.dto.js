"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
class UserDTO {
    constructor() { }
    static checkEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static checkPassword(password) {
        return password.length >= 8;
    }
    static register(data) {
        const { username, email, password } = data;
        if (!username || !email || !password)
            return {
                error: {
                    message: 'All fields are required: username, email and password'
                }
            };
        if (!this.checkEmail(email))
            return {
                error: {
                    message: 'Invalid email'
                }
            };
        if (!this.checkPassword(password))
            return {
                error: {
                    message: 'Invalid password, password must be at least 8 characters long'
                }
            };
        const hashPassword = bcrypt.hashSync(password, 10);
        return {
            error: null, value: {
                username,
                email,
                password: hashPassword,
            }
        };
    }
    static login(data) {
        const { email, password } = data;
        if (!email || !password)
            return {
                error: {
                    message: 'All fields are required: email and password'
                }
            };
        if (!this.checkEmail(email))
            return {
                error: {
                    message: 'Invalid email'
                }
            };
        return {
            error: null, value: {
                email,
                password
            }
        };
    }
}
exports.default = UserDTO;
