import { makeCreateProductUseCase } from '../use-cases/factories/make-create-product-use-case'

const products = [
  {
    image: 'https://cactusteals.com.br/cdn/shop/products/0f40b778d8f79988bfab87cfe9d2f0c4.jpg?v=1684441061',
    name: 'JORDAN 1 RETRO HIGH X TRAVIS SCOTT',
    size: 40,
    brand: 'Jordan',
    price: 100000,
    amount: 1,
    userId: 'd65620ae-070f-49fa-a4b3-c9594130d252',
  },
  {
    image: 'https://cactusteals.com.br/cdn/shop/products/beaaee2d1d08d7cc9bf3e8c9965a6130.jpg?v=1684183071',
    name: 'NIKE DUNK LOW X OFF-WHITE "LOT 29"',
    size: 40,
    brand: 'Nike',
    price: 100000,
    amount: 1,
    userId: 'd65620ae-070f-49fa-a4b3-c9594130d252',
  },
  {
    image: 'https://cactusteals.com.br/cdn/shop/products/5787fb61a03a2e1b93dc1b12f8661f78.jpg?v=1690434386',
    name: 'ADIDAS YEEZY SLIDE "AZURE"',
    size: 40,
    brand: 'Adidas',
    price: 100000,
    amount: 1,
    userId: 'd65620ae-070f-49fa-a4b3-c9594130d252',
  },
  {
    image: 'https://cactusteals.com.br/cdn/shop/products/206e1a24f49b780218b91eb8bdb5ad05.jpg?v=1690434326',
    name: 'ADIDAS GAZELLE INDOOR "BLISS PINK PURPLE" (W)',
    size: 40,
    brand: 'Adidas',
    price: 100000,
    amount: 1,
    userId: 'd65620ae-070f-49fa-a4b3-c9594130d252',
  },
  {
    image: 'https://cactusteals.com.br/cdn/shop/products/cad7492f6f2df5325fbdacc6dbd306bc.jpg?v=1690397754',
    name: 'ADIDAS CAMPUS 00S "DARK GREEN"',
    size: 40,
    brand: 'Adidas',
    price: 100000,
    amount: 1,
    userId: 'd65620ae-070f-49fa-a4b3-c9594130d252',
  },
]

async function generateProducts() {
  const createProductUseCase = makeCreateProductUseCase()

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < products.length; j++) {
      await createProductUseCase.execute(products[j])
    }
  }
}

generateProducts()