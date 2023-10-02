import { Product } from '@prisma/client'
import { ProductsRepository } from './../repositories/product-repository'

interface CreateProductUseCaseRequest {
  image: string
  name: string
  size: number
  brand: string
  price: number
  amount: number
  userId: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productsRepository:ProductsRepository) {}

  async execute({
    image,
    name,
    size,
    brand,
    price,
    amount,
    userId,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await this.productsRepository.create({
      image,
      name,
      size,
      brand,
      price,
      amount,
      userId,
    })

    return {
      product,
    }
  }
}
