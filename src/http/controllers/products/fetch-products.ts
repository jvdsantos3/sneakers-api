import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchProductsUseCase } from '../../../use-cases/factories/make-fetch-products-use-case copy'

export async function fetchProducts(request: FastifyRequest, reply: FastifyReply) {
  const fetchProductsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchProductsQuerySchema.parse(request.query)

  const fetchProductsUseCase = makeFetchProductsUseCase()

  const { products } = await fetchProductsUseCase.execute({
    page,
  })

  return reply.status(200).send({
    products,
  })
}