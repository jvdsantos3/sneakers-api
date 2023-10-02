import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  // Authenticated
  app.get('/account', { onRequest: [verifyJwt] }, profile)
}