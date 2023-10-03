import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  findById(productId: number): Promise<Product | null>
  findMany(page: number, query?: string): Promise<Product[]>
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  save(data: Product): Promise<Product>
  delete(productId: number): Promise<void>
}