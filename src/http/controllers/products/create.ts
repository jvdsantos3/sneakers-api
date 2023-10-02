import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateProductUseCase } from '../../../use-cases/factories/make-create-product-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createProductBodySchema = z.object({
    image: z.string(),
    name: z.string(),
    size: z.number(),
    brand: z.string(),
    price: z.number(),
    amount: z.number(),
  })

  const { image, name, size, brand, price, amount } = createProductBodySchema.parse(request.body)

  const userId = request.user.sub

  const createProductUseCase = makeCreateProductUseCase()

  await createProductUseCase.execute({
    image,
    name,
    size,
    brand,
    price,
    amount,
    userId
  })

  return reply.status(201).send()
}