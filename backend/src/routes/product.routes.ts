import express from "express";
import passport from "../middlewares/auth.mid";
import ProductController from "../controllers/product.controller";

// API /api/v1/product

export default express
  .Router()

  // -- Middlewares
  .use(passport.authenticate("userJWT", { session: false }))

  // -- Routes
  .get("/getAll", ProductController.getAll)
  .get("/getById/:id", ProductController.getById)
  .get("/getDeleted", ProductController.getDeleted)

  .post("/create", ProductController.create)
  .post("/createMany", ProductController.createMany)

  .put("/update/:id", ProductController.update)

  .delete("/delete/:id", ProductController.delete)
  .delete("/deleteAllProducts", ProductController.deleteAll)
