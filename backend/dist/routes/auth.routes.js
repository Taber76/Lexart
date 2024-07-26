"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
// API /api/v1/auth
exports.default = express_1.default
    .Router()
    /**
   * POST /api/v1/auth/register
   * @summary Register new users
   * @tags AutH
   * @param {object} request.body.required - User details
   * @example request - Example of request body
   * {
   *    "username": "admin",
   *    "email": "admin@admin.com",
   *    "password": "admin1234"
   * }
   * @return {object} 201 - User created
   * @example response - 201 - Example of response
   * {
   *  "success": true,
   *  "message": "User created successfully.",
   *  "user": {
   *     "username": "admin"
   *    },
   *  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
   * }
   * @return {object} 400 - Invalid data
   * @example response - 400 - Example of response
   * {
   *  "success": false,
   *  "message": "Error: Registration -> email must be unique."
   * }
   * @return {object} 500 - Internal server error
   * @example response - 500 - Example of response
   * {
   *  "success": false,
   *  "message": "Internal server error."
   * }
   */
    .post("/register", auth_controller_1.default.register)
    /**
     * POST /api/v1/auth/login
     * @summary Login users
     * @tags AutH
     * @param {object} request.body.required - User details
     * @example request - Example of request body
     * {
     *    "email": "admin@admin.com",
     *    "password": "admin1234"
     * }
     * @return {object} 200 - User logged in
     * @example response - 200 - Example of response
     * {
     *  "success": true,
     *  "message": "User logged in successfully.",
     *  "user": {
     *     "username": "admin"
     *    },
     *  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
     * }
     * @return {object} 400 - Invalid data
     * @example response - 400 - Example of response
     * {
     *  "success": false,
     *  "message": "Invalid email or password."
     * }
     * @return {object} 500 - Internal server error
     * @example response - 500 - Example of response
     * {
     *  "success": false,
     *  "message": "Internal server error."
     * }
     */
    .post("/login", auth_controller_1.default.login)
    .use(auth_mid_1.default.authenticate("userJWT", { session: false }))
    /**
     * GET /api/v1/auth/checkToken
     * @summary Check user token
     * @tags AutH
     * @security BearerAuth
     * @return {object} 200 - User logged in
     * @return {object} 401 - Unauthorized
     * @return {object} 500 - Internal server error
     */
    .get("/checkToken", auth_controller_1.default.checkToken);
