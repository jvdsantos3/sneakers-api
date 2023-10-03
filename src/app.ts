import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { usersRoutes } from './http/controllers/users/routes'
import { productsRoutes } from './http/controllers/products/routes'

export const app = fastify()

app.register(cors, {
  origin: true
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '2h',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(productsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})