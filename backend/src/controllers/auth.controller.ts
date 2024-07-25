import { type Request, type Response, type NextFunction } from "express";
import AuthService from "../services/auth.service";
import HTTP_STATUS from "../constants/httpStatusCodes";
import UserDTO from "../dtos/user.dto";

export default class AuthController {
  private constructor() { }

  public static async register(req: Request, res: Response, next: NextFunction) {
    const { error, value } = UserDTO.register(req.body);
    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(error);
      return;
    }
    try {
      const serviceResponse = await AuthService.register(value);
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    const { error, value } = UserDTO.login(req.body);
    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(error);
      return;
    }
    try {
      const serviceResponse = await AuthService.login(value.email, value.password);
      if (serviceResponse.success === false) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await AuthService.checkToken(req.headers.authorization as string);
      if (!serviceResponse) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'Invalid token' });
        return;
      }
      res.status(HTTP_STATUS.OK).json({ success: true, message: 'Token valid', token: serviceResponse });
    } catch (error) {
      next(error);
    }
  }

}