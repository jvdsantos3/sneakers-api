import { Prisma, Product } from '@prisma/client'
import { ProductsRepository } from '../product-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findById(productId: number) {
    const product = this.items.find((item) => item.id === productId)

    if (!product) {
      return null
    }

    return product
  }

  async findMany(page: number) {
    return this.items.slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = {
      id: this.items.length + 1,
      image: data.image,
      name: data.name,
      size: data.size,
      brand: data.brand,
      price: data.price,
      amount: data.amount,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: null,
    }

    this.items.push(product)

    return product
  }

  async save(product: Product) {
    const productIndex = this.items.findIndex(item => item.id === product.id)

    if (productIndex >= 0) {
      this.items[productIndex] = product
    }

    return product
  }

  async delete(productId: number) {
    const productIndex = this.items.findIndex((item) => item.id === productId)

    if (productIndex >= 0) {
      this.items.splice(productIndex, 1)
    }
  }
}