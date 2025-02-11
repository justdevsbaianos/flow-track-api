import { z } from 'zod';

export const configSchema = z.object({
  PORT: z.coerce.number().int(),
  DATABASE_URL: z.string(),
});

export type configSchema = z.infer<typeof configSchema>;
