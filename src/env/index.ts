import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid envrironment variables.', _env.error.format())

  throw new Error('Invalid envrironment variables.')
}

export const env = _env.data