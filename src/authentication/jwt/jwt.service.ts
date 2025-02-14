import { Injectable } from '@nestjs/common';
import { TypedConfigService } from 'src/config.service';

@Injectable()
export class JwtProvider {
  private readonly configJwt: TypeConfigJwt = configJwt;
}

const configInstance = TypedConfigService.getInstance();
const configJwt = {
  alg: configInstance.get('JWT_ALG'),
  iss: configInstance.get('JWT_ISS'),
  secret: configInstance.get('JWT_SECRET'),
};

type TypeConfigJwt = typeof configJwt;
