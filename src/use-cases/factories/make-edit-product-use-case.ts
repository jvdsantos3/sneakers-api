import { PrismaProductsRepository } from '../../repositories/prisma/prisma-products-repository'
import { EditProductUseCase } from '../edit-product'


export function makeEditProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()

  const useCase = new EditProductUseCase(prismaProductsRepository)

  return useCase
}