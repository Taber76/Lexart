import { type Request, type Response, type NextFunction } from "express";
import ProductService from "../services/product.service";
import HTTP_STATUS from "../constants/httpStatusCodes";
import ProductDTO from "../dtos/product.dto";


export default class ProductController {
  private constructor() { }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await ProductService.getAll(true);
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
      const serviceResponse = await ProductService.getAll(false);
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
    const { error, value } = ProductDTO.register(req.body);
    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(error);
      return;
    }
    try {
      const serviceResponse = await ProductService.create(value);
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
      /*
      const serviceResponse = await ProductService.createMany('');
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
        */
      res.status(HTTP_STATUS.NOT_IMPLEMENTED).json({ success: false, message: 'Not implemented' });
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Product id is required' });
      return;
    }
    const { error, value } = ProductDTO.update(req.body);
    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(error);
      return;
    }
    try {
      const serviceResponse = await ProductService.update(req.params.id, value);
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
      /*
      const serviceResponse = await ProductService.deleteAll('');
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      */
      res.status(HTTP_STATUS.NOT_IMPLEMENTED).json({ success: false, message: 'Not implemented' });
    } catch (error) {
      next(error);
    }
  }


}