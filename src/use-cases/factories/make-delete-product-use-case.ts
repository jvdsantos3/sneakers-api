import { PrismaProductsRepository } from '../../repositories/prisma/prisma-products-repository'
import { DeleteProductUseCase } from '../delete-product'


export function makeDeleteProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const useCase = new DeleteProductUseCase(prismaProductsRepository)

  return useCase
}