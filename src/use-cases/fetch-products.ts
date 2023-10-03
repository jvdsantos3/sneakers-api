import { Product } from '@prisma/client'
import { ProductsRepository } from './../repositories/product-repository'

interface FetchProductUseCaseRequest {
  page: number
  query?: string
}

interface FetchProductUseCaseResponse {
  products: Product[]
  total: number
}

export class FetchProductsUseCase {
  constructor(private productsRepository:ProductsRepository) {}

  async execute({ page, query }: FetchProductUseCaseRequest): Promise<FetchProductUseCaseResponse> {
    const {products, total} = await this.productsRepository.findMany(page, query)

    return {
      products,
      total,
    }
  }
}
