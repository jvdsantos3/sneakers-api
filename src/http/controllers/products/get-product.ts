import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeGetProductUseCase } from '../../../use-cases/factories/make-get-product-use-case'

export async function getProduct(request: FastifyRequest, reply: FastifyReply) {
  const getProductParamsSchema = z.object({
    productId: z.coerce.number(),
  })

  const { productId } = getProductParamsSchema.parse(request.params)

  try {
    const getProductUseCase = makeGetProductUseCase()

    const { product } = await getProductUseCase.execute({
      productId,
    })

    return reply.status(200).send({
      product,
    })
  } catch(err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}