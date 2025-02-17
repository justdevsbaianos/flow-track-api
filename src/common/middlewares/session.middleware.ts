import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorHelper } from '../helpers/responses/responses-error.helper';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    next();
  }
}
