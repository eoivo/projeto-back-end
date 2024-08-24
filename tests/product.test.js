const request = require('supertest');
const app = require('../app');

describe('Product API', () => {
  it('should fetch all products', async () => {
    const response = await request(app).get('/api/products/v1/products');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      slug: 'test-product',
      price: 10.00,
      price_with_discount: 8.00 
    };
    const response = await request(app)
      .post('/api/products/v1/products')
      .send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test Product');
  });

  
});
