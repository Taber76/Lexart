import { type Request, type Response, type NextFunction } from "express";
import ProductService from "../services/product.service";
import HTTP_STATUS from "../constants/httpStatusCodes";


export default class ProductController {
  private constructor() { }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await ProductService.getAll();
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Product id is required' });
        return;
      }
      const serviceResponse = await ProductService.getById(req.params.id);
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


  public static async getDeleted(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await ProductService.getDeleted();
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await ProductService.create(req.body);
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


  public static async createMany(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await ProductService.createMany();
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Product id is required' });
        return;
      }
      const serviceResponse = await ProductService.update(req.params.id, req.body);
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Product id is required' });
        return;
      }
      const serviceResponse = await ProductService.delete(req.params.id);
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await ProductService.deleteAll();
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


}