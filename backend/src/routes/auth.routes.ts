import express from "express";
import passport from "../middlewares/auth.mid";
import AuthController from "../controllers/auth.controller";

// API /api/v1/auth
export default express
  .Router()

  .post("/register", AuthController.register)
  .post("/login", AuthController.login)

  .use(passport.authenticate("userJWT", { session: false }))
  .get("/checkToken", AuthController.checkToken)