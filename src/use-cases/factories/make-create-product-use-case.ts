import { PrismaProductsRepository } from '../../repositories/prisma/prisma-products-repository'
import { CreateProductUseCase } from '../create-product'


export function makeCreateProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const useCase = new CreateProductUseCase(prismaProductsRepository)

  return useCase
}