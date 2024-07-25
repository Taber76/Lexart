import express from "express";
import passport from "../middlewares/auth.mid";
import AuthController from "../controllers/auth.controller";

// API /api/v1/auth
export default express
  .Router()

  /**
 * POST /api/v1/auth/register
 * @summary Register new users
 * @tags AutH
 * @param {array<object>} request.body.required - User details
 * @return {array<object>} 201 - User created
 * @return {object} 400 - Invalid data
 * @return {object} 500 - Internal server error
 */
  .post("/register", AuthController.register)


  /**
   * POST /api/v1/auth/login
   * @summary Login users
   * @tags AutH
   * @param {object} request.body.required - User details
   * @return {object} 200 - User logged in
   * @return {object} 400 - Invalid data
   * @return {object} 500 - Internal server error
   */
  .post("/login", AuthController.login)

  .use(passport.authenticate("userJWT", { session: false }))

  /**
   * GET /api/v1/auth/checkToken
   * @summary Check user token
   * @tags AutH
   * @security BearerAuth
   * @return {object} 200 - User logged in
   * @return {object} 401 - Unauthorized
   * @return {object} 500 - Internal server error
   */
  .get("/checkToken", AuthController.checkToken)