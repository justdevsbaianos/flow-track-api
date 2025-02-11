import { Logger } from '@nestjs/common';
import { ErrorResponseDto } from 'src/common/dto/responses/response-error.dto';
import { ZodError } from 'zod';

export class ErrorHelper {
  private static logger = new Logger();

  static throwValidationError(error: ZodError): never {
    throw new ErrorResponseDto(400, 'Validation Error', error.format());
  }

  /**
   * TODO - Finalizar classe Helper
   */
  static throwCustomError(code: number, message: string, details?: any) {
    this.logger.log(message);
  }
}
