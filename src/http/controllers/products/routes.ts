import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getProduct } from './get-product'
import { fetchProducts } from './fetch-products'
import { editProduct } from './edit'
import { deleteProduct } from './delete'

export async function productsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.get('/products/:productId', getProduct)
  app.get('/products', fetchProducts)
  app.post('/products', create)
  app.put('/products/:productId', editProduct)
  app.delete('/products/:productId', deleteProduct)
}