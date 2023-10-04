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

  async findMany(page: number, query?: string) {
    let total: Product[]

    if (query) {
      total = await prisma.product.findMany({
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      })
    } else {
      total = await prisma.product.findMany()
    }

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: [
        {
          createdAt: 'desc',
        }
      ]
    })

    return {
      products,
      total: total.length,
    }
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