import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeEditProductUseCase } from '../../../use-cases/factories/make-edit-product-use-case'

export async function editProduct(request: FastifyRequest, reply: FastifyReply) {
  const editProductParamsSchema = z.object({
    productId: z.coerce.number(),
  })

  const editProductBodySchema = z.object({
    image: z.string(),
    name: z.string(),
    size: z.number(),
    brand: z.string(),
    price: z.number(),
    amount: z.number(),
  })

  const { productId } = editProductParamsSchema.parse(request.params)
  const { image, name, size, brand, price, amount } = editProductBodySchema.parse(request.body)

  try {
    const editProductUseCase = makeEditProductUseCase()

    const { product } = await editProductUseCase.execute({
      productId,
      image, 
      name,
      size,
      brand,
      price,
      amount,
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