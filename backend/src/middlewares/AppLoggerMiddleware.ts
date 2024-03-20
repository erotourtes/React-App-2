import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    this.logger.log(
      `${method} ${url} ${userAgent} ${ip}\n${JSON.stringify(request.body)}`,
    );

    response.on('close', () => {
      this.logger.log(`Sent: ${method} ${url}`);
    });

    next();
  }
}
