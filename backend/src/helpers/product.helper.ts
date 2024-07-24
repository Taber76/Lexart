import { faker } from '@faker-js/faker';
import { ProductCreationAttributes } from '../models';

export default class ProductHelper {
  private constructor() { }

  private static createProduct(): ProductCreationAttributes {
    return {
      type: 'cellphone',
      brand: faker.commerce.productMaterial(),
      model: faker.commerce.productMaterial(),
      description: faker.commerce.productDescription(),
      price: faker.datatype.number({ min: 1000, max: 10000 }),
      image: 'imageUrl',
      quantity: faker.datatype.number({ min: 10, max: 100 }),
    }
  }

  public static createMany(qty: number): ProductCreationAttributes[] {
    const products: ProductCreationAttributes[] = [];
    for (let i = 0; i < qty; i++) {
      products.push(this.createProduct());
    }
    return products;
  }

}