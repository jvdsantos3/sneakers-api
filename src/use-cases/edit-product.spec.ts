import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { EditProductUseCase } from './edit-product'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let productsRepository: InMemoryProductsRepository
let sut: EditProductUseCase

describe('Edit Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new EditProductUseCase(productsRepository)
  })

  it('should be able to edit product', async () => {
    const beforeEditProduct = await productsRepository.create({
      image: 'image',
      name: 'Product 1',
      size: 40,
      brand: 'Nike',
      price: 180000,
      amount: 1,
      userId: 'user-01'
    })

    const { product } = await sut.execute({
      productId: beforeEditProduct.id,
      image: 'image',
      name: 'Product 1',
      size: 40,
      brand: 'Nike',
      price: 200000,
      amount: 1,
    })

    expect(product.id).toEqual(beforeEditProduct.id)
    expect(product).toEqual(
      expect.objectContaining({ price: 200000 })
    )
  })

  it('should not be able to edit inexistent product', async () => {
    await expect(() => 
      sut.execute({
        productId: 1,
        image: 'image',
        name: 'Product 1',
        size: 40,
        brand: 'Nike',
        price: 200000,
        amount: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})