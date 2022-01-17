import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// An attempt to create custom logging
@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Request ... ${req.baseUrl} ... ${res.statusCode} ... ${req.statusMessage}`,
    );
    next();
  }
}
