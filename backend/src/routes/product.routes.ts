import express from "express";
import passport from "../middlewares/auth.mid";
import ProductController from "../controllers/product.controller";

// API /api/v1/product

export default express
  .Router()

  // -- Middlewares
  .use(passport.authenticate("userJWT", { session: false }))

  // -- Routes

  /**
   * GET /api/v1/products/getAll
   * @summary Get all products
   * @tags Product
   * @security BearerAuth
   * @return {array<object>} 200 - List of products
   * @return {object} 401 - Unauthorized
   * @return {object} 500 - Internal server error
   */
  .get("/getAll", ProductController.getAll)


  /**
   * GET /api/v1/products/getById/{id}
   * @summary Get a product by ID
   * @tags Product
   * @param {string} id.path.required - Product ID
   * @security BearerAuth
   * @return {object} 200 - Product found
   * @return {object} 400 - Invalid data
   * @return {object} 401 - Unauthorized
   * @return {object} 500 - Internal server error
   */
  .get("/getById/:id", ProductController.getById)


  /**
   * GET /api/v1/products/getDeleted
   * @summary Get deleted products
   * @tags Product
   * @security BearerAuth
   * @return {array<object>} 200 - List of deleted products
   * @return {object} 401 - Unauthorized
   * @return {object} 500 - Internal server error
   */
  .get("/getDeleted", ProductController.getDeleted)


  /**
 * POST /api/v1/products/create
 * @summary Create a new product
 * @tags Product
 * @security BearerAuth
 * @param {object} request.body.required - Product details
 * @return {object} 201 - Product created
 * @return {object} 400 - Invalid data
 * @return {object} 401 - Unauthorized
 * @return {object} 500 - Internal server error
 */
  .post("/create", ProductController.create)

  /**
 * POST /api/v1/products/createMany
 * @summary Create multiple products
 * @tags Product
 * @security BearerAuth
 * @param {array<object>} request.body.required - Product details
 * @return {array<object>} 201 - Products created
 * @return {object} 400 - Invalid data
 * @return {object} 401 - Unauthorized
 * @return {object} 500 - Internal server error
 */
  .post("/createMany", ProductController.createMany)


  /**
 * PUT /api/v1/products/update/{id}
 * @summary Update a product by ID
 * @tags Product
 * @security BearerAuth
 * @param {string} id.path.required - Product ID
 * @param {object} request.body.required - New product details
 * @return {object} 200 - Product updated
 * @return {object} 400 - Invalid data
 * @return {object} 401 - Unauthorized
 * @return {object} 500 - Internal server error
 */
  .put("/update/:id", ProductController.update)


  /**
 * DELETE /api/v1/products/delete/{id}
 * @summary Delete a product by ID
 * @tags Product
 * @security BearerAuth
 * @param {string} id.path.required - Product ID
 * @return {object} 200 - Product deleted
 * @return {object} 401 - Unauthorized
 * @return {object} 500 - Internal server error
 */
  .delete("/delete/:id", ProductController.delete)


  /**
 * DELETE /api/v1/products/deleteAllProducts
 * @summary Delete all products
 * @tags Product
 * @security BearerAuth
 * @return {object} 200 - All products deleted
 * @return {object} 401 - Unauthorized
 * @return {object} 500 - Internal server error
 */
  .delete("/deleteAllProducts", ProductController.deleteAll)
