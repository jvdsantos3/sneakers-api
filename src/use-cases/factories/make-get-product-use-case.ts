import { PrismaProductsRepository } from '../../repositories/prisma/prisma-products-repository'
import { GetProductUseCase } from '../get-product'


export function makeGetProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const useCase = new GetProductUseCase(prismaProductsRepository)

  return useCase
}