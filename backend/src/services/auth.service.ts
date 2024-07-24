import UserDAO from '../daos/user.dao';
import { UserAttributes } from '../types/user.types';
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
  public static async register(user: UserAttributes, profile_image?: any) {
    if (!user.username || !user.email || !user.password) {
      return { success: false, message: 'Missing required fields.' }
    }
    if (!AuthHelper.checkPasswordStrength(user.password)) {
      return { success: false, message: 'Password must be at least 8 characters long.' }
    }

    try {
      user.password = await AuthHelper.hashPassword(user.password);
      const createdUser = await UserDAO.register(user);
      let message = 'User created successfully.'

      return { success: true, message: message, user: { ...createdUser, password: undefined } };

    } catch (error) {
      return this.handleError(error, false, 'Service creating user [AuthService]');
    }
  }


  // LOGIN USER ----------------------------------------------------------------
  public static async login(email: string, password: string) {
    try {
      if (!email && !password) return { success: false, message: 'Missing required fields.' }
      const user = await UserDAO.login(email);

      if (!user || !await AuthHelper.comparePasswords(password, user.password))
        return {
          success: false,
          message: 'Invalid email or password.'
        };

      const token = AuthHelper.generateToken(user);
      return {
        success: true,
        message: 'User logged in successfully.',
        user: { ...user, password: null },
        token
      };

    } catch (error) {
      return this.handleError(error, false, 'Service logging user [AuthService]');
    }
  }

}