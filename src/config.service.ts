import { ConfigService } from '@nestjs/config';
import { configSchema } from './config.schema';

export class TypedConfigService extends ConfigService {
  private static selfInstance: TypedConfigService;

  static getInstance() {
    if (!this.selfInstance) {
      this.selfInstance = new this();
    }

    return this.selfInstance;
  }

  get<T extends keyof configSchema>(configPath: T): configSchema[T] {
    return super.get<configSchema[T]>(configPath)!;
  }
}

export const typedConfig = TypedConfigService.getInstance();
