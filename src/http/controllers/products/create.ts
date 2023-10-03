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

  // const userId = request.user.sub

  const createProductUseCase = makeCreateProductUseCase()

  try {
    await createProductUseCase.execute({
      image,
      name,
      size,
      brand,
      price,
      amount,
      userId: 'f145d469-d181-40f1-8bce-77ef7db2967b'
    })
  } catch(err) {
    console.log(err)
  }

  return reply.status(201).send()
}