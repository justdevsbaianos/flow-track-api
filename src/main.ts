import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ResponseDto } from './common/dto/responses/response.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const firstError = errors[0];
        const firstConstraintKey = firstError.constraints
          ? Object.keys(firstError.constraints)[0]
          : 'unknown';

        return new BadRequestException(
          new ResponseDto(
            400,
            firstError.constraints?.[firstConstraintKey] || 'Validation Error',
            errors.map((error) => ({
              field: error.property,
              constraints: error.constraints,
            })),
          ),
        );
      },
    }),
  );

  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
