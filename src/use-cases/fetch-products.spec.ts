import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { FetchProductsUseCase } from './fetch-products'

let productsRepository: InMemoryProductsRepository
let sut: FetchProductsUseCase

describe('Fetch Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProductsUseCase(productsRepository)
  })

  it('should be able to fetch products', async () => {
    await productsRepository.create({
      image: 'img',
      name: 'Product 1',
      size: 40,
      brand: 'Nike',
      price: 180000,
      amount: 1,
      userId: 'user-01'
    })

    await productsRepository.create({
      image: 'img',
      name: 'Product 2',
      size: 40,
      brand: 'Nike',
      price: 200000,
      amount: 1,
      userId: 'user-01'
    })

    const { products } = await sut.execute({ page: 1 })

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Product 1' }),
      expect.objectContaining({ name: 'Product 2' })
    ])
  })

  it('should be able to fetch paginated products', async () => {
    for (let i = 1; i <= 22; i++) {
      await productsRepository.create({
        image: 'img',
        name: `Product ${i}`,
        size: 40,
        brand: 'Nike',
        price: 200000,
        amount: 1,
        userId: 'user-01'
      }) 
    }

    const { products } = await sut.execute({
      page: 2
    }) 

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Product 21' }),
      expect.objectContaining({ name: 'Product 22' })
    ])
  })
})