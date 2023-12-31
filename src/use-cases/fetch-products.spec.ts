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

    const { products, total } = await sut.execute({ page: 1 })

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Product 1' }),
      expect.objectContaining({ name: 'Product 2' })
    ])
    expect(total).toEqual(2)
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

    const { products, total } = await sut.execute({
      page: 2
    }) 

    expect(total).toEqual(22)
    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Product 21' }),
      expect.objectContaining({ name: 'Product 22' })
    ])
  })

  it('should be able to fetch products with query', async () => {
    await productsRepository.create({
      image: 'img',
      name: 'Nike',
      size: 40,
      brand: 'Nike',
      price: 180000,
      amount: 1,
      userId: 'user-01'
    })

    await productsRepository.create({
      image: 'img',
      name: 'Adidas',
      size: 40,
      brand: 'Nike',
      price: 200000,
      amount: 1,
      userId: 'user-01'
    })

    const { products, total } = await sut.execute({
      page: 1,
      query: 'Nike'
    }) 

    expect(total).toEqual(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Nike' })
    ])
  })

  it('should be able to fetch paginated products with query', async () => {
    for (let i = 1; i <= 22; i++) {
      await productsRepository.create({
        image: 'img',
        name: `Nike ${i}`,
        size: 40,
        brand: 'Nike',
        price: 200000,
        amount: 1,
        userId: 'user-01'
      }) 
    }

    const { products, total } = await sut.execute({
      page: 2,
      query: 'Nike'
    }) 

    expect(total).toEqual(22)
    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Nike 21' }),
      expect.objectContaining({ name: 'Nike 22' })
    ])
  })
})