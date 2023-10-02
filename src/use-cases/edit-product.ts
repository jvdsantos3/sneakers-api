import { Product } from '@prisma/client'
import { ProductsRepository } from './../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
interface EditProductUseCaseRequest {
  productId: number
  image: string
  name: string
  size: number
  brand: string
  price: number
  amount: number
}

interface EditProductUseCaseResponse {
  product: Product
}

export class EditProductUseCase {
  constructor(private productsRepository:ProductsRepository) {}

  async execute({
    productId,
    image,
    name,
    size,
    brand,
    price,
    amount
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    product.image = image
    product.name = name
    product.size = size
    product.brand = brand
    product.price = price
    product.amount = amount
    product.updatedAt = new Date()

    await this.productsRepository.save(product)

    return {
      product,
    }
  }
}
