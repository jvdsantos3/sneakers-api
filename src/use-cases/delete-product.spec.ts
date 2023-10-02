import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DeleteProductUseCase } from './delete-product'

let productsRepository: InMemoryProductsRepository
let sut: DeleteProductUseCase

describe('Delete Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new DeleteProductUseCase(productsRepository)
  })

  it('should be able to delete product', async () => {
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
    })

    const deletedProduct = await productsRepository.findById(product.id)

    const deletedProductExists = !!deletedProduct

    expect(deletedProductExists).toBe(false)
  })

  it('shoud not be able to delete a inexistent meal', async () => {
    await expect(() =>
      sut.execute({
        productId: 1
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})