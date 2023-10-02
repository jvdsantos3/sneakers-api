import { Product } from '@prisma/client'
import { ProductsRepository } from './../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteProductUseCaseRequest {
  productId: number
}

interface DeleteProductUseCaseResponse {
  product: Product
}

export class DeleteProductUseCase {
  constructor(private productsRepository:ProductsRepository) {}

  async execute({ productId }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    await this.productsRepository.delete(productId)

    return {
      product,
    }
  }
}
