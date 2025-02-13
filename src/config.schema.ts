import { z } from 'zod';

export const configSchema = z.object({
  PORT: z.coerce.number().int(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(12),
  JWT_ISS: z.string().nullable().default('flow-track'),
  JWT_ALG: z.enum([
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'PS256',
    'PS384',
    'PS512',
  ]),
});

export type configSchema = z.infer<typeof configSchema>;
