import { Product } from "../models";
import { ProductAttributes } from "../types";
import { ProductCreationAttributes } from "../models";
import { UniqueConstraintError } from 'sequelize';
import Print from "../utils/print";

export default class ProductDAO {
  private constructor() { }

  public static async getAll(): Promise<ProductAttributes[]> {
    try {
      const products = await Product.findAll();
      return products.map((product) => product.toJSON());
    } catch (error: any) {
      Print.error('Error getting products [DAO].');
      throw new Error(`Get all -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async getById(id: string): Promise<ProductAttributes | null> {
    try {
      const product = await Product.findOne({ where: { id: id } });
      if (!product) return null
      return product.toJSON();
    } catch (error: any) {
      Print.error('Error getting product [DAO].');
      throw new Error(`Get by id -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async getDeleted(): Promise<ProductAttributes[]> {
    try {
      const products = await Product.findAll({ where: { active: false } });
      return products.map((product) => product.toJSON());
    } catch (error: any) {
      Print.error('Error getting deleted products [DAO].');
      throw new Error(`Get deleted -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async register(product: ProductCreationAttributes): Promise<ProductAttributes> {
    try {
      const createdProduct = await Product.create(product);
      return createdProduct.toJSON();
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error registering product [DAO].');
      throw new Error(`Registration -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async registerMany(products: ProductCreationAttributes[]): Promise<ProductAttributes[]> {
    try {
      const createdProducts = await Product.bulkCreate(products);
      return createdProducts.map((product) => product.toJSON());
    } catch (error: any) {
      Print.error('Error registering products [DAO].');
      throw new Error(`Registration -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async update(product: Partial<ProductAttributes>, allProducts: boolean): Promise<ProductAttributes | null> {
    try {
      if (allProducts) {
        await Product.update(product, { where: { active: true } });
        return null
      } else {
        const productToUpdate = await Product.findOne({ where: { id: product.id } });
        if (!productToUpdate) return null
        const updatedProduct = await productToUpdate.update(product);
        return updatedProduct.toJSON();
      }
    } catch (error: any) {
      Print.error('Error updating product [DAO].');
      throw new Error(`Update -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

}