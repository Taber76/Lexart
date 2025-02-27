import ProductDAO from "../daos/product.dao";
import { server } from "../app";
import { ProductAttributes } from "../types";
import { ProductCreationAttributes } from "../models";
import ProductHelper from "../helpers/product.helper";
import Print from "../utils/print";

export default class ProductService {
  private constructor() { }

  // ERROR HANDLING -------------------------------------------------------------
  private static handleError(error: any, success: boolean, console: string) {
    Print.error(console);
    return { success, message: '' + error }
  }

  // GET ALL PRODUCTS ----------------------------------------------------------
  public static async getAll(active: boolean) {
    try {
      const products = await ProductDAO.getAll(active);
      return {
        success: true,
        message: 'Products retrieved successfully.',
        products
      };
    } catch (error) {
      return this.handleError(error, false, 'Service getting all products [ProductService]');
    }
  }

  // GET PRODUCT BY ID ---------------------------------------------------------
  public static async getById(id: string) {
    try {
      const product = await ProductDAO.getById(id);
      return {
        success: true,
        message: 'Product retrieved successfully.',
        product: product
      };
    } catch (error) {
      return this.handleError(error, false, 'Service getting product by id [ProductService]');
    }
  }


  // CREATE PRODUCT ------------------------------------------------------------
  public static async create(product: ProductCreationAttributes) {
    try {
      const createdProduct = await ProductDAO.register(product);
      return {
        success: true,
        message: 'Product created successfully.',
        product: createdProduct
      }
    } catch (error) {
      return this.handleError(error, false, 'Service creating product [ProductService]');
    }
  }

  // CREATE 50 PRODUCTS --------------------------------------------------------
  public static async createMany(wsClient: string) {
    try {
      for (let i = 0; i < 50; i++) {
        setTimeout(async () => {
          const product = ProductHelper.createMany(1);
          await ProductDAO.register(product[0]);

          server.socketServer?.sendMessageToClient(wsClient, {
            type: 'progress',
            progress: ((i + 1) / 50) * 100,
          });

          if (i === 49) {
            server.socketServer?.sendMessageToClient(wsClient, {
              type: 'createdAllProducts',
              success: true,
            });
          }
        }, i * 200);
      }

      //const createdProducts = await ProductDAO.registerMany(products);
      return {
        success: true,
        message: 'Products created successfully.',
        //products: createdProducts
      }
    } catch (error) {
      return this.handleError(error, false, 'Service creating products [ProductService]');
    }
  }


  // UPDATE PRODUCT ------------------------------------------------------------
  public static async update(id: string, product: Partial<ProductAttributes>) {
    try {
      const productToUpdate = await ProductDAO.getById(id);
      if (!productToUpdate)
        return {
          success: false,
          message: 'Product not found.'
        }
      const updatedProduct = await ProductDAO.update({ id, ...product }, false);
      return {
        success: true,
        message: 'Product updated successfully.',
        product: updatedProduct
      }
    } catch (error) {
      return this.handleError(error, false, 'Service updating product [ProductService]');
    }
  }


  // DELETE PRODUCT ------------------------------------------------------------
  public static async delete(id: string) {
    try {
      const productToDelete = await ProductDAO.getById(id);
      if (!productToDelete)
        return {
          success: false,
          message: 'Product not found.'
        }
      const deletedProduct = await ProductDAO.update({ id, active: false }, false);
      return {
        success: true,
        message: 'Product deleted successfully.',
        product: deletedProduct
      }
    } catch (error) {
      return this.handleError(error, false, 'Service deleting product [ProductService]');
    }
  }

  // DELETE ALL PRODUCTS -------------------------------------------------------
  public static async deleteAll(wsClient: string) {
    try {
      const products = await ProductDAO.getAll(true);
      for (let i = 0; i < products.length; i++) {
        setTimeout(async () => {
          await ProductDAO.update({ id: products[i].id, active: false }, false);

          server.socketServer?.sendMessageToClient(wsClient, {
            type: 'progress',
            progress: ((i + 1) / products.length) * 100,
          });

          if (i === products.length - 1) {
            server.socketServer?.sendMessageToClient(wsClient, {
              type: 'deletedAllProducts',
              success: true,
            });
          }
        }, i * 200);
      }

      return {
        success: true,
        message: 'Products deleted successfully.',
      }
    } catch (error) {
      return this.handleError(error, false, 'Service deleting all products [ProductService]');
    }
  }


}