import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from './create-product'

let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productsRepository)
  })

  it('should be able to create product', async () => {
    const { product } = await sut.execute({
      image: 'image',
      name: 'Product 1',
      size: 40,
      brand: 'Nike',
      price: 200000,
      amount: 1,
      userId: 'user-01',
    })

    expect(product.id).toEqual(expect.any(Number))
  })
})