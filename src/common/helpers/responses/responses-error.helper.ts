import { Logger } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/responses/response.dto';
import { number, ZodError } from 'zod';

export class ErrorHelper {
  private static logger = new Logger();

  static throwValidationError(error: ZodError): never {
    throw new ResponseDto(400, 'Validation Error', error.format());
  }

  /**
   * TODO - Finalizar classe Helper
   */
  static throwCustomError(code: number, message: string, details?: any): never {
    this.logger.log(message);

    if (code >= 500) {
      this.logger.error(message);
    } else {
      this.logger.debug(message);
    }

    throw new ResponseDto(code, message, details);
  }
}
