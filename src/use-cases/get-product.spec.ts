import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetProductUseCase } from './get-product'

let productsRepository: InMemoryProductsRepository
let sut: GetProductUseCase

describe('Get Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new GetProductUseCase(productsRepository)
  })

  it('should be able to edit product', async () => {
    const createdProduct = await productsRepository.create({
      image: 'image',
      name: 'Product 1',
      size: 40,
      brand: 'Nike',
      price: 180000,
      amount: 1,
      userId: 'user-01'
    })

    const { product } = await sut.execute({
      productId: createdProduct.id,
    })

    expect(product.id).toEqual(expect.any(Number))
  })

  it('shoud not be able to get a inexistent meal', async () => {
    await expect(() =>
      sut.execute({
        productId: 1
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})