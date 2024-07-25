import UserDAO from '../daos/user.dao';
import { UserCreationAttributes } from '../models';
import AuthHelper from '../helpers/auth.helper';
import Print from "../utils/print";

export default class AuthService {
  private constructor() { }

  // ERROR HANDLING -------------------------------------------------------------
  private static handleError(error: any, success: boolean, console: string) {
    Print.error(console);
    return { success, message: '' + error }
  }

  // REGISTER USER -------------------------------------------------------------
  public static async register(user: UserCreationAttributes) {
    try {
      const createdUser = await UserDAO.register(user);
      if (!createdUser) return { success: false, message: 'User already exists.' };

      const token = AuthHelper.generateToken(createdUser);
      return {
        success: true,
        message: 'User created successfully.',
        user: { username: createdUser.username },
        token
      };

    } catch (error) {
      return this.handleError(error, false, 'Service creating user [AuthService]');
    }
  }


  // LOGIN USER ----------------------------------------------------------------
  public static async login(email: string, password: string) {
    try {
      const user = await UserDAO.getByEmail(email);

      if (!user || !await AuthHelper.comparePasswords(password, user.password))
        return {
          success: false,
          message: 'Invalid email or password.'
        };

      const token = AuthHelper.generateToken(user);
      return {
        success: true,
        message: 'User logged in successfully.',
        user: { username: user.username },
        token
      };

    } catch (error) {
      return this.handleError(error, false, 'Service logging user [AuthService]');
    }
  }

  // CHECK USER TOKEN ----------------------------------------------------------
  public static async checkToken(token: string) {
    try {
      const decodedToken = AuthHelper.decodeToken(token);
      return decodedToken;
    } catch (error) {
      return false;
    }
  }

}