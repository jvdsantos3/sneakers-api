import { Product } from '@prisma/client'
import { ProductsRepository } from './../repositories/product-repository'

interface FetchProductUseCaseRequest {
  page: number
}

interface FetchProductUseCaseResponse {
  products: Product[]
}

export class FetchProductsUseCase {
  constructor(private productsRepository:ProductsRepository) {}

  async execute({ page }: FetchProductUseCaseRequest): Promise<FetchProductUseCaseResponse> {
    const products = await this.productsRepository.findMany(page)

    return {
      products,
    }
  }
}
