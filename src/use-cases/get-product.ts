import { Product } from '@prisma/client'
import { ProductsRepository } from './../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetProductUseCaseRequest {
  productId: number
}

interface GetProductUseCaseResponse {
  product: Product
}

export class GetProductUseCase {
  constructor(private productsRepository:ProductsRepository) {}

  async execute({ productId }: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return {
      product,
    }
  }
}
