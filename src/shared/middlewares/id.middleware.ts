import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AppLogger } from '../logger/app.logger';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    req['requestId'] = requestId;

    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const ip = req.ip;

    this.logger.log(
      `Incoming Request - ID: ${requestId} - ${method} ${originalUrl} - ${userAgent} - ${ip}`,
      'RequestLoggerMiddleware',
    );

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `Response Sent - ID: ${requestId} - ${method} ${originalUrl} - Status: ${statusCode}`,
        'RequestLoggerMiddleware',
      );
    });

    next();
  }
}
