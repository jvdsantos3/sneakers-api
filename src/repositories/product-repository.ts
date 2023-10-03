import { Prisma, Product } from '@prisma/client'

interface FindManyResponse {
  products: Product[]
  total: number
}

export interface ProductsRepository {
  findById(productId: number): Promise<Product | null>
  findMany(page: number, query?: string): Promise<FindManyResponse>
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  save(data: Product): Promise<Product>
  delete(productId: number): Promise<void>
}