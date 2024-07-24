import express from "express";
import AuthController from "../controllers/auth.controller";

// API /api/v1/auth
export default express
  .Router()
  .post("/register", AuthController.register)
  .post("/login", AuthController.login)

