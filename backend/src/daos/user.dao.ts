import { User } from "../models";
import { UserAttributes } from "../types/user.types";
import { UniqueConstraintError } from 'sequelize';
import Print from "../utils/print";

export default class UserDAO {
  private constructor() { }

  public static async register(user: UserAttributes) {
    try {
      const createdUser = await User.create(user);
      return createdUser.toJSON();
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error registering user [DAO].');
      throw new Error(`Registration -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async login(email: string) {
    try {
      const foundUser = await User.findOne({ where: { email: email } });
      if (!foundUser) return null
      return foundUser.toJSON();
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error logging user [DAO]: ' + error.errors);
      throw new Error(`Login -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

}