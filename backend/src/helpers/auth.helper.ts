import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } from '../config/environment';

export default class AuthHelper {
  private constructor() { }

  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  public static async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(user: any) {
    return jwt.sign({ ...user, password: null }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
  }

  public static verifyToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET as string);
      if (typeof decodedToken === 'object' && decodedToken !== null) {
        const { iat, exp, ...rest } = decodedToken;
        return rest;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public static decodeToken(token: string): { [key: string]: any } {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET as string) as { [key: string]: any };
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }


}