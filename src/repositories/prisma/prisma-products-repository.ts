import { prisma } from '../../lib/prisma'
import { Prisma, Product } from '@prisma/client'
import { ProductsRepository } from '../product-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async findById(productId: number) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      }
    }) 

    return product
  }

  async findMany(page: number) {
    const products = await prisma.product.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: [
        {
          createdAt: 'desc',
        }
      ]
    })

    return products
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data,
    })

    return product
  }

  async save(data: Product) {
    const product = await prisma.product.update({
      where: {
        id: data.id,
      },
      data,
    })

    return product
  }

  async delete(productId: number) {
    await prisma.product.delete({
      where: {
        id: productId,
      }
    })
  }
}