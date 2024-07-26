"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
class Print {
    constructor() {
        colors_1.default.enable();
    }
    static error(message) {
        console.log(colors_1.default.red.underline(message));
    }
    static critical(message) {
        console.log(colors_1.default.red(message));
    }
    static warning(message) {
        console.log(colors_1.default.yellow(message));
    }
    static http(message) {
        console.log(colors_1.default.blue(message));
    }
    static info(message) {
        console.log(colors_1.default.cyan(message));
    }
    static success(message) {
        console.log(colors_1.default.green(message));
    }
    static debug(message) {
        console.log(colors_1.default.magenta(message));
    }
}
exports.default = Print;
