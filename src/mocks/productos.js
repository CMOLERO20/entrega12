
import faker from 'faker'
faker.locale = 'es'

function createNFakeProducts(n) {
  const prod = [];
  for (let i = 0; i < n; i++) {
    
    prod.push(createFakeProduct(n));
  }
  return prod;
}

function createFakeProduct(id) {
    return {
        title : faker.commerce.product(),
        price : faker.commerce.price(),
        thumbnail : faker.image.imageUrl(),
        id: id,
    }
}

export {
    createFakeProduct,
    createNFakeProducts
}