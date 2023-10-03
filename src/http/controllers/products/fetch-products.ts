import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchProductsUseCase } from '../../../use-cases/factories/make-fetch-products-use-case copy'

export async function fetchProducts(request: FastifyRequest, reply: FastifyReply) {
  const fetchProductsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    query: z.string().optional(),
  })

  const { page, query } = fetchProductsQuerySchema.parse(request.query)

  const fetchProductsUseCase = makeFetchProductsUseCase()

  const { products, total } = await fetchProductsUseCase.execute({
    page,
    query: query,
  })

  return reply.status(200).send({
    products,
    total
  })
}