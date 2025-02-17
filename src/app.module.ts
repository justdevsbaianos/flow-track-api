import { HttpException, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './config.schema';
import { LoggerModule } from 'nestjs-pino';
import { ErrorHelper } from './common/helpers/responses/responses-error.helper';
import { SessionMiddleware } from './common/middlewares/session.middleware';
import { UserModule } from './user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const configParsed = configSchema.safeParse(config);

        console.log(configParsed);

        if (!configParsed.success) {
          // throw new HttpException(configParsed.);
          ErrorHelper.throwValidationError(configParsed.error);
        }

        return config;
      },
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [],

  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(customer: MiddlewareConsumer) {
    // customer.apply(SessionMiddleware).forRoutes('*');
  }
}
