import { type Request, type Response, type NextFunction } from "express";
import AuthService from "../services/auth.service";
import HTTP_STATUS from "../constants/httpStatusCodes";

export default class AuthController {
  private constructor() { }

  public static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await AuthService.register(req.body, req.file);
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
    try {
      const serviceResponse = await AuthService.login(req.body.email, req.body.password);
      if (serviceResponse.success === false) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

}