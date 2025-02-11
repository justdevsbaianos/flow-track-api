import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './config.schema';
import { LoggerModule } from 'nestjs-pino';
import { ErrorHelper } from './common/helpers/responses/responses-error.helper';

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

        if (!configParsed.success) {
          ErrorHelper.throwValidationError(configParsed.error);
        }

        return config;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
