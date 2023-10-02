import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeDeleteProductUseCase } from '../../../use-cases/factories/make-delete-product-use-case'

export async function deleteProduct(request: FastifyRequest, reply: FastifyReply) {
  const deleteProductParamsSchema = z.object({
    productId: z.coerce.number(),
  })

  const { productId } = deleteProductParamsSchema.parse(request.params)

  try {
    const deleteProductUseCase = makeDeleteProductUseCase()

    await deleteProductUseCase.execute({
      productId,
    })

    return reply.status(204).send()
  } catch(err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}